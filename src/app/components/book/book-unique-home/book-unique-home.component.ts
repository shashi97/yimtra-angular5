import { Component, OnInit } from '@angular/core';
import { BookService, BookUnique } from '../shared';
import { CoreService, CMSModel } from '../../../core/shared';
import { CmsSystemEnum,divCmsId } from '../../../shared/enum/cms-sytem-enum';
import { LoaderService } from '../../../core/loader';
import { ApiUrl } from '../../../api.service';



@Component({
  selector: 'app-book-unique-home',
  templateUrl: './book-unique-home.component.html',
})
export class BookUniqueHomeComponent implements OnInit {
  cmsData: Array<CMSModel> = new Array<CMSModel>();
  div1: CMSModel = new CMSModel();
  div2: CMSModel = new CMSModel();
  div3: CMSModel = new CMSModel();
  div4: CMSModel = new CMSModel();
  div5: CMSModel = new CMSModel();
  bookUnique: BookUnique = new BookUnique();
  src: String;
  attachmentUrl: String;
  constructor(private bookService: BookService,
    private loaderService: LoaderService,
    private coreService: CoreService) {
  }

  ngOnInit() {
    this.getIndex();
  }

  async getBookIndividual() {
    this.bookUnique.CheckIn = '2018-01-18';
    this.bookUnique.CheckOut = '2018-01-18';
    this.bookUnique.NumberofGuestsInRoom = 120;
    try {
      const response = await this.bookService.getBookIndividual(this.bookUnique);
      // // console.log(response.data.Result);
    } catch (e) {

    }
  }
  async getIndex() {
    try {
      this.loaderService.show();
      const response = await this.coreService.cmsResultById(CmsSystemEnum.BookUniqueHome);
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
      // console.log(this.cmsData);
    } catch (e) {
      // console.log(e);
      this.loaderService.hide();
    }

  }
}
