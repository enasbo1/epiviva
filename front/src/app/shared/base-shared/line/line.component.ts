import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'epv-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
  @Input() short:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
