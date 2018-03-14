import { Component, OnInit } from '@angular/core';
import { CoreService, CMSModel } from '../shared';
import { CmsSystemEnum } from '../../shared/enum/cms-sytem-enum';
import { LoaderService } from '../loader';
export enum divCmsId {
  div1 = 8,
  div2 = 9,
  div3 = 10,
  div4 = 11,
  div5 = 12,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  cmsData: Array<CMSModel> = new Array<CMSModel>();
  div1: CMSModel = new CMSModel();
  div2: CMSModel = new CMSModel();
  div3: CMSModel = new CMSModel();
  div4: CMSModel = new CMSModel();
  div5: CMSModel = new CMSModel();

  constructor(private coreService: CoreService,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.getIndex();
  }

  async getIndex() {
    try {
      this.loaderService.show();
      const response = await this.coreService.cmsResultById(CmsSystemEnum.Index);
      this.cmsData = response.data.Result;
      this.cmsData.forEach(item => {
        if (item.sysConstantId === divCmsId.div1) {
          this.div1 = item;
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
      // console.log(this.cmsData);
    } catch (e) {
      // console.log(e);
      this.loaderService.hide();
    }

  }

}
