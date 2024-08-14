import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'epv-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  open:boolean=false
  protected value:string = "empty";
  @Input() default:string|number|undefined;
  @Input() set?:boolean;
  @Input() prefix:string = "";
  @Input() styles:string = "";
  @Input() choices:string[] = [];
  @Output() value_up:EventEmitter<string> = new EventEmitter<string>();
  constructor(private eRef: ElementRef) { }
  @Input()
  set set_value(val:string|undefined) {
    this.value = val?val:"all";
  }

  ngOnInit(): void {
    if (this.default){
      this.value = this.default.toString();
      if (this.choices.includes(this.value) || this.set){
        this.selectValue(this.value)
      }
    }
    else if (this.choices!==[]){
      this.value = this.choices[0]
    }
  }


  toggle():void{
    this.open = !this.open;
  }

  selectValue(value:string){
    this.open = false;
    this.value = value;
    this.value_up.emit(value);
  }
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }
}
