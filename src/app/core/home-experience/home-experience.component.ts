import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CMSModel } from '../shared';
import { ApiUrl } from '../../api.service';
declare const $: any;

@Component({
  selector: 'app-home-experience',
  templateUrl: './home-experience.component.html'
})
export class HomeExperienceComponent implements OnInit, OnChanges {
  images: Array<any> = [];
  sliderCss: string = 'mainIndex';

  @Input() div: CMSModel;
  constructor() {
  }

  ngOnInit() { }

  ngOnChanges() {
    if (this.div.attachment.length > 0) {
      this.div.attachment.forEach(item => {
        let obj = {
          imgSrc: ApiUrl.SRC_URI + item.attachmentUrl,
          sType: 'img'
        }
        this.images.splice(this.images.length, 0, obj);
      });
    }
  }

}
