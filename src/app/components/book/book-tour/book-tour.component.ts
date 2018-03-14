import { Component, OnInit } from '@angular/core';
import {BookTourSearchFilterComponent } from './book-tour-search-filter/book-tour-search-filter.component';
import { CoreService, CMSModel } from '../../../core/shared';
import { CmsSystemEnum } from '../../../shared/enum/cms-sytem-enum';
import { LoaderService } from '../../../core/loader';
import { ApiUrl } from '../../../api.service';
@Component({
  selector: 'app-book-tour',
  templateUrl: './book-tour.component.html'
})
export class BookTourComponent implements OnInit {
  src: String;
  attachmentUrl: String;
  cmsData: Array<CMSModel> = new Array<CMSModel>();
  constructor(private loaderService: LoaderService,
    private coreService: CoreService) {
  }

  ngOnInit() {
    this.getIndex();
  }

  async getIndex() {
    try {
     // this.loaderService.show();
     // const response = await this.coreService.cmsResultById(CmsSystemEnum.BookUniqueHome);
     // this.cmsData = response.data.Result;
      this.src = "http:\\localhost:5000\attachments\rdravid.jpg";
      //ApiUrl.SRC_URI + item.attachment[0].attachmentUrl;
      // this.cmsData.forEach(item => {
      //    this.src = ApiUrl.SRC_URI + item.attachment[0].attachmentUrl;
      //    return;
        // if (item.sysConstantId === divCmsId.div1) {
        //   this.src = ApiUrl.SRC_URI + item.attachment[0].attachmentUrl;
        // }
        // if (item.sysConstantId === divCmsId.div2) {
        //   this.div2 = item;
        // }
        // if (item.sysConstantId === divCmsId.div3) {
        //   this.div3 = item;
        // }
        // if (item.sysConstantId === divCmsId.div4) {
        //   this.div4 = item;
        // }
        // if (item.sysConstantId === divCmsId.div5) {
        //   this.div5 = item;
        // }
     // });
      this.loaderService.hide();
      console.log(this.cmsData);
    } catch (e) {
      // console.log(e);
      this.loaderService.hide();
    }

  }

}
