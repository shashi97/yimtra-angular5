import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CMSModel } from '../shared';
import { ApiUrl } from '../.././api.service';

@Component({
  selector: 'app-video-slider',
  templateUrl: './video-slider.component.html'
})
export class ViderSliderComponent implements OnInit, OnChanges {
  @Input() div: CMSModel;
  videoUrl: string = '';

  constructor() { }

  ngOnInit() {
    if (this.div.attachment.length > 0) {
      this.videoUrl = this.div.attachment[0].attachmentUrl;
    }
  }

  ngOnChanges() {
    if (this.div.attachment.length > 0) {
      this.videoUrl = ApiUrl.SRC_URI + this.div.attachment[0].attachmentUrl;
    }
  }

}
