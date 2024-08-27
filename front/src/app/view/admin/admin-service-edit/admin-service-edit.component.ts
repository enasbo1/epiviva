import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";
import {ServiceModelService} from "../../../http/model/service-model/service-model.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../shared/global.service";
import {ServiceObject} from "../../../http/model/service-model/serviceObject";
import {EpvPath} from "../../routes";
import {LanguageService} from "../../../shared/base-shared/language.service";

@Component({
  selector: 'epv-admin-service-edit',
  templateUrl: './admin-service-edit.component.html',
  styleUrls: ['./admin-service-edit.component.scss']
})
export class AdminServiceEditComponent implements OnInit {
  public error?:string;
  private is_date : boolean = true;
  public service:ServiceObject ={
    nom:'',
  };
  public serviceForm: FormStepObject[] = [];

  get savable():boolean {
    return (!this.is_date) && (this.service.nom!=='');
  }

  constructor(
      private serviceModelService:ServiceModelService,
      private router:Router,
      private route:ActivatedRoute,
      private language:LanguageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.serviceModelService.get_one_service(params['id']).subscribe(
            (services)=>{
              this.service = services[0]
              this.service.nom = this.service.nom.toString().replace(/\*$/, '').replace(/^\*/, '');
              this.service.description = this.service.description?.toString()?.replace(/\*$/, '')?.replace(/^\*/, '');
              GlobalService.pageName = this.language.resolve('service.edit') + ' : ' + this.language.resolve(this.service.nom);
              this.serviceForm = JSON.parse(this.service.form?? '[]') as FormStepObject[];
            }
        );
      }
    });
  }

  save(){
    if (this.savable && this.service){
      this.service.form = JSON.stringify(this.serviceForm?? '[]');
      this.service.nom = "*"+this.service.nom+"*";
      if (this.service.description?.indexOf('\n')===undefined){
        this.service.description = "*"+this.service.description+"*"
      }
      this.serviceModelService.update_service(this.service).subscribe(()=>{
            this.router.navigate(['/' + EpvPath.admin.services.details.replace(':id', this.service.id?.toString() ?? '0')],{queryParams:{message:'service.edited'}}).then()
          }
      )
    }
  }

  edited(){
    this.is_date = false;
  }

  protected readonly EpvPath = EpvPath;

}
