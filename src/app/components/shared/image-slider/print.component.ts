import { DomSanitizer } from '@angular/platform-browser'
import { Pipe, PipeTransform, Component, Input } from '@angular/core';

@Component({
  selector: "printSlide",
  template: `<img [src]="meta.imgSrc" *ngIf="meta.sType=='img'" [ngStyle]="sliderChangeEvent()"/>`
})

export class printSlide {
  @Input("meta") meta: any;
  @Input() sliderCss: string = '';
  constructor() { }

  sliderChangeEvent() {
    switch (this.sliderCss) {
      case 'bookUniqueHomeDetail':
        return { 'height': "400px" };
      case 'bookUniqueHomeSearch':
        return { 'height': "200px" };
      case 'bookTaxiDetail':
        return { 'height': "500px" };
      case 'bookTaxiSearch':
        return { 'height': "180px" };
      case 'mainIndex':
        return { 'height': "400px" };
      case 'bookExperienceSearch':
        return { 'height': "200px" };
    }
  }
}
