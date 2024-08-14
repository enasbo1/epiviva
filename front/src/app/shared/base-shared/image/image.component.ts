import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'epv-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() style:string = "cover";
  @Input() title:string = "";
  @Input() imageUrl:string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
