import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
    selector: 'ep-star',
    templateUrl: 'star.component.html',
    styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnChanges{
    @Input() rating: number = 0;
    cropWidth: number = 75;
    @Output() ratingClocked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        this.cropWidth = this.rating * 75/5;
    }

    onClick():void{
        this.ratingClocked.emit(`The rating ${this.rating} was clicked`);
    }
}
