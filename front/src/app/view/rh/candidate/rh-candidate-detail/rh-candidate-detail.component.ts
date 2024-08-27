import {Component, EventEmitter, OnInit} from '@angular/core';
import {CandidateObject} from "../../../../http/model/candidate-model/candidateObject";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ChatTarget} from "../../../../shared/foundation/chat/chat.component";
import {CandidateModelService} from "../../../../http/model/candidate-model/candidate-model.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../../../shared/global.service";
import {LanguageService} from "../../../../shared/base-shared/language.service";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../../../../shared/foundation/form/form.service";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {CandidateMapperService} from "../../../../mapper/candidate-mapper.service";
import {EpvPath} from "../../../routes";
import {DistributeModelService} from "../../../../http/model/distribute-model/distribute-model.service";
import {SectorModelService} from "../../../../http/model/sector-model/sector-model.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {AddressMapperService} from "../../../../mapper/address-mapper.service";
import {SectorObject} from "../../../../http/model/sector-model/sectorObject";
import {AddressModelService} from "../../../../http/model/address-model/address-model.service";
import {UserMapperService} from "../../../../mapper/user-mapper.service";

@Component({
  selector: 'epv-rh-candidate-detail',
  templateUrl: './rh-candidate-detail.component.html',
  styleUrls: ['./rh-candidate-detail.component.scss']
})
export class RhCandidateDetailComponent implements OnInit {

  candidate?:CandidateObject;
  answerRubric?:RubricObject;
  chat_target?: ChatTarget;
  userRubric?: RubricObject[];



  constructor(
      private candidateModelService:CandidateModelService,
      private route: ActivatedRoute,
      private sectorModelService:SectorModelService,
      private distributeModelService: DistributeModelService,
      private addressModelService: AddressModelService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.candidateModelService.get_one_candidate(params['id']).subscribe((candidates)=>
          {
            this.candidate = candidates[0];
            this.chat_target = {subject:'candidate', id : this.candidate.id??0};
            GlobalService.pageName = LanguageService.static_resolve('candidate.name')+ ' : ' + this.candidate.service.nom + ' n°' + this.candidate.id
            let formFields:FormFieldObject[] = FormService.extract_values(JSON.parse(this.candidate.service.form?? '[]') as FormStepObject[]);
            this.answerRubric = {
              title : "form.answer",
              content : (JSON.parse(this.candidate.answer?? '[]') as {name:string, value:string}[]).map((value)=>
                  CandidateMapperService.answer_to_rubric(value, formFields)
              )
            }
            this.addressModelService.get_one_address(this.candidate.user.address_id??0).subscribe((address)=>{
              this.userRubric = [
                  UserMapperService.modelRecap_to_rubric(this.candidate?.user),
                  AddressMapperService.model_to_rubric(address[0])
              ]
            })
          }
        )
      }
    })
  }

  validate() {
    if (this.candidate && this.candidate.validated!=='valid') {
      this.sectorModelService.get_sector().subscribe(sector => {
        this.add_affect(sector)?.subscribe(()=> {
          this.candidateModelService.validate_candidature(this.candidate?.id ?? 0).subscribe(() => {
            this.router.navigate(
                ['/' + EpvPath.rh.volunteer.details.replace(':id', (this.candidate?.id ?? 0).toString())],
                {queryParams: {message: "candidate.validateMessage"}}
            ).then();
          })
        })
      })
    }
  }

  private add_affect(sectors:SectorObject[]):EventEmitter<void>|void {
    if(sectors && this.candidate){
      const affect:EventEmitter<object|undefined> = new EventEmitter<object|undefined>();
      const ret:EventEmitter<void> = new EventEmitter<void>();
      affect.subscribe((obj:object|undefined)=>
          {
            if (obj){
              this.distributeModelService.post_distribute(
                  {
                    user_id : this.candidate?.id??0,
                    sector_id : (obj as {id:number|bigint}).id
                  }
              ).subscribe(()=>
                  {
                    if (GlobalService.modalCurrent)
                      GlobalService.modalCurrent.visible=false;
                    ret.emit();
                  }
              )
            }
          }
      )
      ModaleService.createListModal(
          [
            ...sectors.map(sector=>
            {
              return {
                object:sector,
                content:[
                  {
                    text:sector.nom,
                    style:'font-weight:bolder',
                    submitEvent:affect
                  },
                  {
                    text:AddressMapperService.get_address(sector.address),
                    style:'font-style:italic'
                  }
                ]
              }
            }),
          ],
          'volunteer.affect'
      ).subscribe(()=>undefined)
      return ret;
    }
  }


  reject() {
    if (this.candidate  && this.candidate.validated!=='reject') {
      this.candidateModelService.reject_candidate(this.candidate.id ?? 0).subscribe(()=>
          {
            this.router.navigate(
                ['/'+EpvPath.rh.candidate.list],
                {queryParams:{message:"candidate.rejectMessage"}}
            ).then();
          }
      )
    }
  }
  protected readonly EpvPath = EpvPath;
  protected readonly AddressMapperService = AddressMapperService;
}