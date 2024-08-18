import {Component, Input, OnInit} from '@angular/core';
import {ListObject, ListObjectPropriety} from "./listObject";
import {TextStyle} from "../../base-shared/textStyle";
import {_FilterObject, Act, FilterObject} from "./filterObject";
import {FilterService} from "./filter.service";
import {ModaleService} from "../modale/modale.service";
import moment from "moment/moment";
import {FormFieldObject} from "../../base-shared/form-field/formFieldObject";
import {FormService} from "../form/form.service";
import {DateService} from "../../../http/shared/date.service";
import {Params} from "@angular/router";

@Component({
  selector: 'epv-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items:ListObject[]=[];
  @Input() line_size:3|2|1 = 2;
  @Input() critera?:string[];
  @Input() filters:FilterObject[]|undefined;
  @Input() query?:Params;
  _filters:_FilterObject[]|undefined;
  protected act?:Act<_FilterObject>;
  search_crit:string="Title";
  search_value:string="";
  constructor() {}

  ngOnInit(): void {
    if (this.critera){
      this.critera.splice(0,0,"search.title");
    }
    if (this.filters){
      this._filters = [];
      this.filters?.forEach(filter => {
        filter.choices?.splice(0,0,"all");
        this._filters?.push({
          name:filter.name,
          type:filter.type,
          choices:filter.choices?filter.choices:[],
          set:filter.set,
          default:filter.default,
          value:filter.default,
          required_act:filter.required_act,
          upwarp:filter.upwarp
        });
      });
    }
  }

  refresh_filter():void{
    this._filters?.forEach(filter => {
      if (filter.type === "auto") {
        const value = filter.value;
        filter.value = "all";
        filter.choices =
          this.filter_item().map(
            item =>
              this.findFilter(item, filter.name)
          ).filter(
            (item, i, ar) =>
              // enlèves les doublons
              (item) &&
              (ar.findIndex(
                it =>
                  it?.value == item.value
              ) === i)
          ).map(
            //extrait la valeur de la propriété
            pro => pro?.value
          ).map(
            val => val?.toString()
          ) as string[];
        filter.choices.splice(0,0,"all");
        filter.value = value;
      }
    })
  }

  filter_item():ListObject[]{
    let filtered_list:ListObject[] = this.items;
    this.act = undefined;
    for(let filter of this._filters?? []){
      if (filter.value!==undefined && (filter.value!='all')){
        filtered_list = filtered_list.filter(
          (item:ListObject) =>
            FilterService.isConforme(
              filter,
              this.findFilter(item, filter.name)
            )
        );
      }else if (filter.required_act !== undefined){
        this.act = filter.required_act;
        this.act.target = filter;
        return [];
      }
    }

    if (this.search_crit === "Title"){
      filtered_list = filtered_list.filter(
        item =>
          item.title?.toLowerCase().includes(this.search_value.toLowerCase())
      ).sort((a,b)=>
        (a.title?a.title:'').localeCompare(b.title?b.title:''));
    }else{
      filtered_list = filtered_list.filter(
        item =>
          this.findFilter(item, this.search_crit)
            ?.value?.toString().toLowerCase().includes(this.search_value.toLowerCase())
      ).sort((a,b)=>
          (this.findFilter(a,this.search_crit)?.value?.toString()?? "")
              .localeCompare(
                  this.findFilter(b,this.search_crit)?.value?.toString()?? ""
        )
      );
    }
    return filtered_list;
  }

  findFilter(item:ListObject, name:string):ListObjectPropriety|undefined{
    return item.properties?.find(
      value =>
        value.name?.toLowerCase() === name.toLowerCase()
    )
  }

  element(item:ListObject):{side:string, content:(TextStyle|null)[]|undefined}[]{
    const to_ret = [
      {side: "right col-4", content: item.right},
      {side: "mid col-4", content: item.mid},
      {side: "left col-4", content: item.left}
    ];
    let retenue: number = 0;
    let mid: string = "mid";
    let retenue_mid: number = 0;

    if (this.is_null_content(item.right)){
      to_ret[0].side = "hided"
      retenue+=1
    }

    if (this.is_null_content(item.mid)){
      mid = "hided"
      retenue+=1
    }else if (retenue==1){
      /* dans le cas où il n'y a pas de right, on met le mid à droite et on aggrandit le mid */
      mid = 'right'
      retenue_mid = retenue;
      retenue = 0;
    }

    if (this.is_null_content(item.left)){
      to_ret[2].side = "hided";
      retenue+=1
    }else{
      if (retenue==1){
        /* dans le cas où il n'y a pas de mid, on met le right et le left à la même taille */
        to_ret[0].side = "right col-6";
        to_ret[2].side = "left col-6";
        retenue=0
      }else{
        to_ret[2].side = "left col-"+(4+retenue*4);
        retenue=0
      }

    }
    /* on applique les changements sur le mid ou le right en fonction que qui existe */
    if (mid!="hided"){
      retenue += retenue_mid
      to_ret[1].side = mid + " col-"+(4+retenue*4)
    }else{
      to_ret[1].side = mid
      if (retenue!=0){
        to_ret[0].side = 'right' + " col-"+(4+retenue*4)
      }
    }

    return to_ret
  }

  elements_size():string{
    if (this.line_size>3){
      this.line_size = 3;
    }
    switch (this.line_size){
      case 3:
        return "col-lg-4 col-md-6";
      case 2:
        return "col-lg-6";
      default:
        return '';
    }
  }
  /*
  * verifie si le contenu d'un pannel d'un ListObject est vide (true si vide)
  *
  **/
  private is_null_content(content:(TextStyle|null)[]|undefined):boolean{
    if (!content){
      return true;
    }
    for(let i of content){
      if (i!==null){
        return false;
      }
    }
    return true;
  }
  switch_rubric(value:string):void{
    this.search_crit = value;
  }

  filter_update(filter:_FilterObject, value:string):void{
    if (filter.type==='bool'){
      filter.value = (value === filter.choices[0]);
    }else{
      filter.value = value;
    }
    filter.upwarp?.emit(value);
  }

  reset_filter():void{
    for(let filt of this._filters?this._filters:[]){
      filt.set_value = "all"
      filt.value = "all"
    }
  }

  get filtered():_FilterObject[]|undefined{
    return this._filters?.filter((x)=>x.type!=='hided')
  }

  static setPeriod(filter:_FilterObject):void{
    const period = filter.value?.toString().split(" - ").map(x=> moment(x, DateService.FORMAT_FRONT));
    ModaleService.createFormModal({
      title:filter.name,
      content:[
        {
          content:[
            {
              name:"period",
              title:"",
              type:"period",
              _values: period?.map(x =>  x.toDate())
            },
          ]
        }
      ]
    }).subscribe(
      (values:FormFieldObject[]):void=>{
        const n = FormService.get_period(values, 'period');
        filter.value = DateService.to_front(moment(n.start, DateService.FORMAT_API).toDate()) + " - " + DateService.to_front(moment(n.end, DateService.FORMAT_API).toDate());
        filter.upwarp?.emit(filter.value);
      }
    )
  }

  set_period(filter: _FilterObject) {
    ListComponent.setPeriod(filter);
  }
}
