import {Component, EventEmitter, OnInit} from '@angular/core';
import {ServiceObject} from "../../../http/model/service-model/serviceObject";
import {FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";
import {ServiceModelService} from "../../../http/model/service-model/service-model.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LanguageService} from "../../../shared/base-shared/language.service";
import {GlobalService} from "../../../shared/global.service";
import {EpvPath} from "../../routes";
import {ModaleService} from "../../../shared/foundation/modale/modale.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'epv-admin-service-detail',
  templateUrl: './admin-service-detail.component.html',
  styleUrls: ['./admin-service-detail.component.scss']
})
export class AdminServiceDetailComponent implements OnInit {
  public error?:string;
  public service?: ServiceObject;
  public serviceForm?: FormStepObject[];
  constructor(
      private serviceModelService:ServiceModelService,
      private route:ActivatedRoute,
      private router:Router,
      private language: LanguageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.serviceModelService.get_one_service(params['id']).subscribe(
            (services)=>{
              this.service = services[0]
              GlobalService.pageName = this.language.resolve('service.title') + ' : ' + this.language.resolve(this.service.nom);
              this.serviceForm = JSON.parse(this.service.form?? '[]') as FormStepObject[];
            }
        );
      }
    });
  }

  delete() {
    if (this.service) {
      const error = new EventEmitter<HttpErrorResponse>()
      error.subscribe(()=>
          ModaleService.createTextModal('service.deleteError')
      )
      ModaleService.createValidationModal('service.deleteValidation').subscribe(yes=> {
          if (yes === 'Oui')  {
            this.serviceModelService.delete_service(this.service?.id ?? 0, error).subscribe(()=>
                this.router.navigate(
                    ['/'+EpvPath.admin.services.list],
                    {
                      queryParams:{
                        message:"service.deleteConfirm"
                      }
                    }
                )
            );
          }
        }
      )
    }
  }

  protected readonly EpvPath = EpvPath;

}
