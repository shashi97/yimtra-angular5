import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CMSModel } from '../shared';
import { ApiUrl } from '../../api.service';

@Component({
  selector: 'app-home-deal',
  templateUrl: './home-deal.component.html'
})
export class HomeDealComponent implements OnInit, OnChanges {
  @Input() div: CMSModel;
  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.div.attachment.length > 0) {
      this.div.attachment.forEach(item => {
        item.attachmentUrl = ApiUrl.SRC_URI + item.attachmentUrl;
      });
    }
  }

}
