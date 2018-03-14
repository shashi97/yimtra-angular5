import { Component, OnInit } from '@angular/core';
import { CoreService, CMSModel } from '../../../../core/shared';
import { CmsSystemEnum } from '../../../../shared/enum/cms-sytem-enum';
import { LoaderService } from '../../../../core/loader';
import { ApiUrl } from '../../../../api.service';
import { BookTourService } from '../shared/book-tour.service';
import { BookTourSearchData, BookTourFilterModel } from '..';
import { PaginationService } from '../../../../shared/services';


@Component({
  selector: 'app-tour-search',
  templateUrl: './tour-search.component.html',
})
export class BookTourSearchComponent implements OnInit {
  cmsData: Array<CMSModel> = new Array<CMSModel>();
  src: String;
  attachmentUrl: String;
  params:string = '';
  bookTourFilterModel:BookTourFilterModel;
  bookTours:Array<BookTourSearchData> =[];
  cityName: string = 'null';
  categories :string = '46,47,48,49,50';
  public ApiUrl = ApiUrl;
  constructor(
    private loaderService: LoaderService,
    private coreService: CoreService,
    private bookTourService:BookTourService,
  private paginationService:PaginationService) {
  }

  ngOnInit() {
    this.getTours();
  }

  
  async getTours() {
    try{
    this.bookTourFilterModel = new BookTourFilterModel();
    this.bookTourFilterModel.cityName = 'null';
    this.bookTourFilterModel.svcCatgId = '46,47,48,49,50';
    this.loaderService.show();
      this.paginationService.setFilterValues(this.bookTourFilterModel);
      const response = await this.bookTourService.getBookTours(this.paginationService.getParams());
      // this.bookTours = response.data.Result.data;
      this.loaderService.hide();
    } catch (e) {
      this.loaderService.hide();
    }
  }
}