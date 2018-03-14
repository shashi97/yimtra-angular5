import { Component, OnInit } from '@angular/core';
import { BookService, BookUnique, BookUniqueHomeSearchData, ServiceSubCategoryModel } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';
import { retry } from 'rxjs/operator/retry';
import { promise } from 'selenium-webdriver';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ApiUrl } from '../../../../api.service';
import { DatePipe } from '@angular/common';
import { PaginationService } from '../../../../shared/services';
declare const $: any;
import { TaxiFilterModel, BookTaxiService,TaxiDetailModel } from '../shared/index';
@Component({
  selector: 'app-book-taxi-search',
  templateUrl: './taxi-search.component.html'
})

export class BookTaxiSearchComponent implements OnInit {
  taxiFilterModel: TaxiFilterModel = new TaxiFilterModel();
  taxiList : Array<TaxiDetailModel> = [];
  sliderCss: string = 'bookTaxiSearch';
  apiUrl = ApiUrl;
  locationCss: string = 'locationMapBooking';
  showTaxiType: boolean = false;
  constructor(
    public paginationService: PaginationService,
    private router: Router,
    private loaderService: LoaderService,
    public route: ActivatedRoute,
    public bookTaxiService: BookTaxiService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.taxiFilterModel.FromRoute = param['FromRoute'];
      this.taxiFilterModel.ToRoute = param['ToRoute'];
      this.getTaxiIndividual();
    });
    $.noConflict(true);
    $(document).ready(function () {
      $('.bxslider3').bxSlider({
        auto: false,
        autoHover: true

      });
    });
    $(document).ready(function () {
      $('.bxslider2').bxSlider({
        slideWidth: 390,
        minSlides: 4,
        maxSlides: 4,
        slideMargin: 10,
      });
    });
  }

  async getBookTaxiIndividualDetail(svcId) {
    this.router.navigate(['book/car-detail'], {
      queryParams: {
        FromRoute: this.taxiFilterModel.FromRoute,
        ToRoute: this.taxiFilterModel.ToRoute,
        SvcId: svcId
      }
    });
  }

  async getTaxiIndividual() {
    try {
      this.loaderService.show();
      this.paginationService.setFilterValues(this.taxiFilterModel);
      const response = await this.bookTaxiService.getBookIndividual(this.paginationService.getParams());
      console.log(response.data.Result);      
      this.taxiList = response.data.Result.data;
      this.taxiList.forEach(element => {
        element.images = [];
        element.allAttachments.forEach(attachment => {
          let obj = {
            imgSrc: ApiUrl.SRC_URI + attachment.attachmentUrl,
            sType: 'img'
          }
          element.images.splice(element.images.length, 0, obj);
        });
      });
      this.loaderService.hide();
    } catch (e) {
      this.loaderService.hide();
    }

  }

}
