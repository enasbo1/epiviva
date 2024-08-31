import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DistributeModelService} from "../../../../http/model/distribute-model/distribute-model.service";
import {DistributeAffectedObject} from "../../../../http/model/distribute-model/distributeObject";
import {ProductSelfObject} from "../../../../http/model/product-model/productObject";
import {ProductModelService} from "../../../../http/model/product-model/product-model.service";
import {HelpedModelService} from "../../../../http/model/helped-model/helped-model.service";
import {BenefitGetLargeObject} from "../../../../http/model/benefit-model/benefitObject";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {GlobalService} from "../../../../shared/global.service";
import {SectorMapperService} from "../../../../mapper/sector-mapper.service";
import {SectorModelService} from "../../../../http/model/sector-model/sector-model.service";
import {SectorObject} from "../../../../http/model/sector-model/sectorObject";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {AddressMapperService} from "../../../../mapper/address-mapper.service";
import {DateService} from "../../../../http/shared/date.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {EpvPath} from "../../../routes";
import {jsPDF} from "jspdf";
import {HttpClient} from "@angular/common/http";
import html2canvas from "html2canvas";

@Component({
  selector: 'epv-rh-distribution-detail',
  templateUrl: './rh-distribution-detail.component.html',
  styleUrls: ['./rh-distribution-detail.component.scss']
})
export class RhDistributionDetailComponent implements OnInit {
  public distribute?:DistributeAffectedObject;
  private sector?:SectorObject;
  private stock?:ProductSelfObject[];
  private helped?:BenefitGetLargeObject[];
  public rubric?:RubricObject[];

  constructor(
    private route: ActivatedRoute,
    private distributeModelService: DistributeModelService,
    private sectorModelService:SectorModelService,
    private productModelService:ProductModelService,
    private helpedModelService:HelpedModelService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = 'distribute.title';
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.distributeModelService.get_one_distribute(params['id']).subscribe((distribute)=> {
          this.distribute = distribute[0];
          this.sectorModelService.get_one_sector(this.distribute.sector_id).subscribe((sector)=> {
            this.sector = sector[0]
            this.set_rubric()
          })
        })
        this.productModelService.get_from_distribute(params['id']).subscribe((stock)=> {
          this.stock=stock;
          this.set_rubric();

        })
        this.helpedModelService.get_benefit(params['id']).subscribe((benefit)=> {
          this.helped = benefit;
          this.set_rubric();
        })
      }
    })
  }

  private set_rubric(){
    if (this.distribute && this.stock && this.helped && this.sector) {

      const stockSelected:EventEmitter<void> = new EventEmitter<void>();
      stockSelected.subscribe(()=>
          (this.stock?.length??0)>0?
          this.show_stock()
        :
          ModaleService.createTextModal('distribute.no_stock')
      )

      const helpedSelected:EventEmitter<void> = new EventEmitter<void>();
      helpedSelected.subscribe(()=>
          (this.helped?.length??0)>0?
              this.show_helped()
              :
              ModaleService.createTextModal('distribute.no_helped')
      )
      this.rubric = [
        {
          content:[
            {
              name: 'sector.title',
              type:'modal',
              text:this.sector.nom,
              value:SectorMapperService.model_to_rubric(this.sector, true)
            },
            {
              name:'distribute.user',
              type:'modal',
              text:UserMapperService.get_U_Name(this.distribute.distributor),
              value:UserMapperService.located_to_rubric(this.distribute.distributor, 'distribute.user'),
            },
            {
              name:'distribute.schedule',
              type:'text',
              text: DateService.to_front(this.distribute.schedule, true)
            },
            {
              name:'benefit.username',
              type:'button',
              text: this.helped.length.toString(),
              event:helpedSelected
            },
            {
              name:'distribute.products',
              type:'button',
              text: this.stock.length.toString(),
              event: stockSelected
            },
          ]
        }
      ]
    }
  }

  private show_stock():void{
    ModaleService.createListModal(this.stock?.map((prod)=>{
      return {
        content:[
          {
            text:`${prod.name} "${prod.marque}"`,
            style:'font-weight:bolder',
          },
          {
            text:`${DateService.to_front(prod.expiration_date)}`,
            style:'font-style:italic',
          },
          {
            text:`-${prod.code_barre}-`,
          }
        ]
      }
    })??[],
      'distribute.products'
    )
  }

  private show_helped() {
    ModaleService.createListModal(
      this.helped?.map(helped=>{
        return {
          content:[
            {
              text:UserMapperService.get_U_Name(helped.user, true),
              style:'font-weight:bolder'
            },
            {
              text:AddressMapperService.get_address(helped.user.address),
              style:'font-style:italic'
            },
          ]
        }
      })??[],
      'benefit.username'
    )
  }

  protected readonly EpvPath = EpvPath;

  toPdf() {
    const doc = new jsPDF('p', 'mm', 'a4');

    var text = "\t\tdistribution \n\n horaire : {{schedule}} \n\n\t secteur : {{sector}}\n {{address}}\n\n\t distributeur : {{distributor}}\n {{user}}\n\n\t bénéfiaires\n {{benefit}}\n\n\t produits\n {{product}}"

    text = text.replace('{{schedule}}', DateService.to_front(this.distribute?.schedule, true))
    text = text.replace('{{sector}}', this.sector?.nom?? '')
    text = text.replace('{{address}}', `- adressse : ${this.sector?.address.address}\n - code postal : ${this.sector?.address.postal_code}\n - ville : ${this.sector?.address.city}\n - type : ${this.sector?.address.kind}\n - instructions : ${this.sector?.address.instruction}`)
    text = text.replace('{{distributor}}', UserMapperService.get_U_Name(this.distribute?.distributor, true));
    text = text.replace('{{user}}', `- adressse : ${this.distribute?.distributor?.address.address}\n - code postal : ${this.distribute?.distributor?.address.postal_code}\n - ville : ${this.distribute?.distributor?.address.city}\n - type : ${this.distribute?.distributor?.address.kind}\n - instructions : ${this.distribute?.distributor?.address.instruction}`)
    text = text.replace('{{benefit}}', this.helped?.map(h=>`- ${UserMapperService.get_U_Name(h.user, true)} -${AddressMapperService.get_address(h.user.address)}-`).join('\n ')?? '');
    text = text.replace('{{product}}', this.stock?.map(s=>`- ${s.name} "${s.marque}" ${s.expiration_date} -${s.code_barre}-`).join('\n ')?? '');

    doc.text(text, 15, 25);

    doc.save('export_distribute_*date*.pdf'.replace('*date*', DateService.now_numbers()));

  }
}
