import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { } from '../shared';
import { BookUnique } from '../../shared/book-model';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const $: any;
import { PaginationService } from '../../../../shared/services';
import { ServiceCategoryEnum, ServiceFeeSubCategory } from '../../../../shared/enum/service-category-enum';
import { ApiUrl } from '../../../../api.service';
import { LocalStorageService } from '../../../../shared/services/index';
import { TaxiFilterModel, BookTaxiService,TaxiDetailModel } from '../shared/index';
@Component({
  selector: 'app-book-taxi-detail',
  templateUrl: './taxi-detail.component.html'
})

export class BookTaxiDetailComponent implements OnInit {
  taxiFilterModel: TaxiFilterModel = new TaxiFilterModel();
  taxiDetail : TaxiDetailModel = new TaxiDetailModel();
  locationCss: string = 'uniqueHomeMap';
  sliderCss: string = 'bookTaxiDetail';
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    public bookTaxiService:BookTaxiService,
    public paginationService: PaginationService,
    private loaderService: LoaderService) {
    this.paginationService.setDefaultPage();
    this.taxiFilterModel.SvcId = this.route.snapshot.queryParams['SvcId'];
    this.taxiFilterModel.FromRoute = this.route.snapshot.queryParams['FromRoute'];
    this.taxiFilterModel.ToRoute = this.route.snapshot.queryParams['ToRoute'];
    this.getBookTaxiDetail();
  }

  ngOnInit() {
   
  }

  async getBookTaxiDetail() {
    this.loaderService.show();
    try {
      this.paginationService.setFilterValues(this.taxiFilterModel);
      const response = await this.bookTaxiService.getBookTaxiDetail(this.paginationService.getParams());
      this.taxiDetail = response.data.Result;
      this.taxiDetail.images = [];
      this.taxiDetail.allAttachments.forEach(attach => {
        const obj = {
          imgSrc: ApiUrl.SRC_URI + attach.attachmentUrl,
          sType: 'img'
        }
        this.taxiDetail.images.splice(this.taxiDetail.images.length, 0, obj);
      });
      // this.TaxiDetail.serviceCategory.filter(item => {
      //   if (item.svcCatgId === ServiceCategoryEnum.Languages) {
      //     this.TaxiDetail.language = item.serviceSubCategory[0].svcSCatgDesc;
      //   }
      // });
      // this.totalRoomPrice = this.homeDetail.roomPrice * this.numberOfDays;
      // this.totalPrice = this.totalRoomPrice;
      // this.homeDetail.hostCharges.forEach(item => {
      //   if (item.svcSCatgId !== ServiceFeeSubCategory.RoomPrice) {
      //     this.totalPrice = this.totalPrice + item.amount;
      //   }
      // });
      // this.homeDetail.accommodation = this.totalRoomPrice - this.homeDetail.cleaningFee;
      // this.homeDetail.serviceFee = (this.totalRoomPrice * 4 /100) * this.numberOfDays;
      // this.homeDetail.occupancyTaxes = (this.totalRoomPrice * 2 /100) * this.numberOfDays;
      // this.totalPrice = this.homeDetail.cleaningFee + this.totalRoomPrice +
      // this.homeDetail.serviceFee + this.homeDetail.occupancyTaxes;
      // console.log(this.homeDetail);
      this.loaderService.hide();
    } catch (e) {
      this.loaderService.hide();
    }

  }



}
