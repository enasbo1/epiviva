import {Component, EventEmitter, OnInit} from '@angular/core';
import {ServiceObject} from "../../../http/model/service-model/serviceObject";
import {FormStepObject} from "../../../shared/base-shared/form-step/formStepObject";
import {ServiceModelService} from "../../../http/model/service-model/service-model.service";
import { Router} from "@angular/router";
import {GlobalService} from "../../../shared/global.service";
import {EpvPath} from "../../routes";

@Component({
  selector: 'epv-admin-service-new',
  templateUrl: './admin-service-new.component.html',
  styleUrls: ['./admin-service-new.component.scss']
})
export class AdminServiceNewComponent implements OnInit {
  public error?:string;
  private errorCatch:EventEmitter<string> = new EventEmitter<string>();
  public nom?:string;
  public description?:string;
  public serviceForm: FormStepObject[] = [];

  get savable():boolean {
    return (this.nom!==undefined);
  }

  constructor(
      private serviceModelService:ServiceModelService,
      private router:Router,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "service.new"
    this.errorCatch.subscribe(
        error=>this.error = error
    )
  }

  save(){
    if (this.savable){
      let service:ServiceObject = {
        nom :"*"+this.nom+"*"?? "",
        description : "*"+this.description+"*",
        form : JSON.stringify(this.serviceForm)
      };
      this.serviceModelService.post_service(service).subscribe(()=>{
            this.router.navigate(['/' + EpvPath.admin.services.list],{queryParams:{message:'service.added'}}).then()
          }
      )
    }
  }

  protected readonly EpvPath = EpvPath;

}
