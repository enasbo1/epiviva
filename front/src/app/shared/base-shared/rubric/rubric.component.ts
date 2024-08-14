import {Component, Input, OnInit} from '@angular/core';
import {RubricElement, RubricObject} from "./rubricObject";
import {ModaleService} from "../../foundation/modale/modale.service";

@Component({
  selector: 'epv-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.scss']
})
export class RubricComponent implements OnInit {
  @Input() content?:RubricObject;

  constructor(
  ) { }
  ngOnInit(): void {

  }

  open_image(src?:RubricElement):void{
    if (src){
        src._open = true;
        ModaleService.createImageModal(<string> src.value).subscribe(()=>
        src._open=false
      )
    }
  }

  open_panel(src?:RubricElement):void {
    if (src){
      src._open = true;
      ModaleService.createRubricModal(<RubricObject> src.value).subscribe(()=>
        src._open=false
      )
    }
  }

  open_modal(src?:RubricElement):void {
    if (src){
      src._open = true;
      ModaleService.createRubricModal(<RubricObject> src.value).subscribe(()=>
        src._open = false
      )
    }
  }

  rate(value?:string|RubricObject|number):number{
    return <number>value;
  }
}
