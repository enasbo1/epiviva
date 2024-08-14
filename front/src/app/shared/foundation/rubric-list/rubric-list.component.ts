import {Component, Input, OnInit} from '@angular/core';
import {RubricObject} from "../../base-shared/rubric/rubricObject";

@Component({
  selector: 'epv-rubric-list',
  templateUrl: './rubric-list.component.html',
  styleUrls: ['./rubric-list.component.scss']
})
export class RubricListComponent implements OnInit {
  @Input() items?:RubricObject[]
  constructor() { }

  ngOnInit(): void {
  }

}
