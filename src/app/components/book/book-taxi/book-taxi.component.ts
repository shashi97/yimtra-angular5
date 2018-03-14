import { Component, OnInit } from '@angular/core';
import { CmsSystemEnum,divCmsId } from '../../../shared/enum/cms-sytem-enum';
import { CoreService, CMSModel } from '../../../core/shared';
import { LoaderService } from '../../../core/loader';
import { ApiUrl } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-book-taxi',
  templateUrl: './book-taxi.component.html'
})
export class BookTaxiComponent implements OnInit {
  cmsData: Array<CMSModel> = new Array<CMSModel>();
  div1: CMSModel = new CMSModel();
  div2: CMSModel = new CMSModel();
  div3: CMSModel = new CMSModel();
  div4: CMSModel = new CMSModel();
  div5: CMSModel = new CMSModel();
  src: String;
  attachmentUrl: String;
  constructor(private loaderService: LoaderService,
    private coreService: CoreService,
    private router: Router) {
  }

  ngOnInit() {
    this.getIndex();
  }

  async getIndex() {
    try {
      this.loaderService.show();
      const response = await this.coreService.cmsResultById(CmsSystemEnum.BookTaxi);
      this.cmsData = response.data.Result;
      this.cmsData.forEach(item => {
        if (item.sysConstantId === divCmsId.div1) {
          this.src = ApiUrl.SRC_URI + item.attachment[0].attachmentUrl;
        }
        if (item.sysConstantId === divCmsId.div2) {
          this.div2 = item;
        }
        if (item.sysConstantId === divCmsId.div3) {
          this.div3 = item;
        }
        if (item.sysConstantId === divCmsId.div4) {
          this.div4 = item;
        }
        if (item.sysConstantId === divCmsId.div5) {
          this.div5 = item;
        }
      });
      this.loaderService.hide();
    } catch (e) {      
      this.loaderService.hide();
    }

  }
}
