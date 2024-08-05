import { Component, Input } from '@angular/core';
import { BandObject } from './bandObject';

@Component({
  selector: 'app-info-band',
  templateUrl: './info-band.component.html',
  styleUrls: ['./info-band.component.scss']
})
export class InfoBandComponent {
  @Input() bannerData?: BandObject[]

  public step:number = 0

  public get bandeau():BandObject|undefined{
     if (this.bannerData && this.bannerData.length>this.step){
       return this.bannerData[this.step]
     }
     return undefined;
  }

  public prev():void{
    this.step -= this.is_prev?1:0;
  }

  public next():void{
    this.step += this.is_next?1:0;
  }

  public get is_next():boolean{
    if (this.bannerData){
      return this.step<(this.bannerData?.length-1)
    }
    return false
  }

  public get is_prev():boolean{
    if (this.bannerData){
      return this.step>0
    }
    return false
  }
}

