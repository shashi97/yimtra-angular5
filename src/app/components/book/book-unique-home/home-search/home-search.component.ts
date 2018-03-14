import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BookService, BookUnique, BookUniqueHomeSearchData, ServiceSubCategoryModel } from '../../shared';
import { FilterBookUniqueHomeModel } from '../shared/book-unique-home.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';
import { retry } from 'rxjs/operator/retry';
import { promise } from 'selenium-webdriver';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ApiUrl } from '../../../../api.service';
import { DatePipe } from '@angular/common';
import { PaginationService } from '../../../../shared/services';
import { AttachmentType } from '../../../../shared/enum/cms-sytem-enum';
declare const $: any;


@Component({
  selector: 'app-book-unique-home-search',
  templateUrl: './home-search.component.html'
})

export class BookUniqueHomeSearchComponent implements OnInit, AfterViewInit {
  sliderCss: string = 'bookUniqueHomeSearch';
  apiUrl = ApiUrl;
  showBookingType: boolean = false;
  showRoomType: boolean = false;
  showSize: boolean = false;
  showAmenitie: boolean = false;
  showPrice: boolean = false;
  showPropertyType: boolean = false;
  showExperience: boolean = false;
  bookUnique: BookUnique = new BookUnique();
  bookUniqueHomeSearchData: Array<BookUniqueHomeSearchData> = [];
  filterBookUniqueHome: FilterBookUniqueHomeModel = new FilterBookUniqueHomeModel();
  bookingTypes: Array<ServiceSubCategoryModel>;
  roomTypes: Array<ServiceSubCategoryModel> = [];
  bedrooms: Array<ServiceSubCategoryModel> = [];
  bathrooms: Array<ServiceSubCategoryModel> = [];
  beds: Array<ServiceSubCategoryModel> = [];
  amenities: Array<ServiceSubCategoryModel> = [];
  propertyTypes: Array<ServiceSubCategoryModel> = [];
  experiences: Array<ServiceSubCategoryModel> = [];
  sortingParams: Array<ServiceSubCategoryModel> = [];
  datePipe = new DatePipe('en-US');
  maxSliderValue: number = 53000;
  minSliderValue: number = 0;
  locationCss: string = 'locationMapBooking';
  filterTypeIds: string = '';
  loading = false;
  total = 0;
  page = 1;
  limit = 5;



  constructor(
    public paginationService: PaginationService,
    private bookService: BookService,
    private router: Router,
    private loaderService: LoaderService,
    public route: ActivatedRoute,
  ) {
    this.paginationService.setDefaultPage();
    this.paginationService.pageSize = this.limit;
    this.filterBookUniqueHome.MinRoomPrice = 10;
    this.filterBookUniqueHome.MaxRoomPrice = 53000;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.bookUnique.CheckIn = param['CheckIn'];
      this.bookUnique.CheckIn = this.datePipe.transform(this.bookUnique.CheckIn, 'MM-dd-yyyy');
      this.bookUnique.CityName = param['CityName'];
      this.bookUnique.NumberofGuestsInRoom = param['NumberofGuestsInRoom'];
      this.bookUnique.CheckOut = param['CheckOut'];
      this.bookUnique.CheckOut = this.datePipe.transform(this.bookUnique.CheckOut, 'MM-dd-yyyy');
      this.getBookIndividual();
    });
    this.getbookingTypes(ServiceCategoryEnum.BookingPreferences);
    this.getRoomTypes(ServiceCategoryEnum.RoomType);
    this.getBedrooms(ServiceCategoryEnum.TotalRooms);
    this.getBathrooms(ServiceCategoryEnum.TotalBathrooms);
    this.getBeds(ServiceCategoryEnum.TotalBeds);
    this.getAmenities(ServiceCategoryEnum.Amenities);
    this.getPropertyTypes(ServiceCategoryEnum.PropertyType);
    this.getExperiences(ServiceCategoryEnum.ExperienceType);
    this.getSortingParams(ServiceCategoryEnum.Sort);
  }

  ngAfterViewInit() {

  }

  async getBookIndividual() {
    try {
      this.loaderService.show();
      this.paginationService.setFilterValues(this.bookUnique);
      const response = await this.bookService.getBookIndividual(this.paginationService.getParams());
      console.log(response.data.Result);
      this.bookUniqueHomeSearchData = response.data.Result.data;
      this.total = response.data.Result.totalRecords;
      this.bookUniqueHomeSearchData.forEach(element => {
        element.images = [];
        element.videos = [];
        element.allAttachments.forEach(attachment => {
          if (attachment.attachmentType === AttachmentType.Image) {
            let obj = {
              imgSrc: ApiUrl.SRC_URI + attachment.attachmentUrl,
              sType: 'img'
            }
            element.images.splice(element.images.length, 0, obj);
          } else if (attachment.attachmentType === AttachmentType.Video) {
            let obj = {
              videoSrc: ApiUrl.SRC_URI + attachment.attachmentUrl
            }
            element.videos.splice(element.images.length, 0, obj);
          }
        });
      });
      this.loaderService.hide();
    } catch (e) {
      console.log(e + 'here is the error');
      this.loaderService.hide();
    }

  }

  async getbookingTypes(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.bookingTypes = response.data.Result;
    } catch (e) {
      console.log(e);
    }
  }

  async getSortingParams(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.sortingParams = response.data.Result;
    } catch (e) {
      console.log(e);
    }
  }


  async getRoomTypes(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.roomTypes = response.data.Result;
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getBedrooms(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.bedrooms = response.data.Result;
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getBathrooms(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.bathrooms = response.data.Result;
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getBeds(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.beds = response.data.Result;
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getAmenities(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.amenities = response.data.Result;
    } catch (e) {
      this.loaderService.hide();
      console.log(e);
    }
  }

  async getExperiences(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.experiences = response.data.Result;
      // this.loaderService.hide();
    } catch (e) {
      // this.loaderService.hide();
      // console.log(e);
    }
  }

  async getPropertyTypes(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.propertyTypes = response.data.Result;
      // this.loaderService.hide();
    } catch (e) {
      // this.loaderService.hide();
      // console.log(e);
    }
  }


  getHomeSearchDetail(svcId) {
    this.router.navigate(['book/unique-homes-detail'], {
      queryParams: {
        CityName: this.bookUnique.CityName,
        NumberofGuestsInRoom: this.bookUnique.NumberofGuestsInRoom, CheckIn: this.bookUnique.CheckIn,
        CheckOut: this.bookUnique.CheckOut, svcId: svcId
      }
    });
  }

  OnPriceChange(item) {
    this.filterBookUniqueHome.MinRoomPrice = item.from;
    this.filterBookUniqueHome.MaxRoomPrice = item.to;
    this.onFiltering();
  }

  filterUniqueHome(filterType) {
    filterType.isChecked = !filterType.isChecked;
    if (filterType.isChecked) {
      this.filterTypeIds = this.filterTypeIds != "" ? this.filterTypeIds + ',' + filterType.svcSCatgId : filterType.svcSCatgId.toString();
    } else {
      const arr = this.filterTypeIds.split(',');
      const index = arr.findIndex(i => i === filterType.svcSCatgId.toString());
      arr.splice(index, 1);
      this.filterTypeIds = '';
      arr.forEach(id => {
        if (id !== '') {
          this.filterTypeIds += id + ',';
        }
      });
    }
    this.filterBookUniqueHome.SvcSCatgId = this.filterTypeIds;
    this.onFiltering();
  }

  onFiltering() {
    this.filterBookUniqueHome.CheckIn = this.bookUnique.CheckIn;
    this.filterBookUniqueHome.CheckOut = this.bookUnique.CheckOut;
    this.filterBookUniqueHome.CityName = this.bookUnique.CityName;
    this.filterBookUniqueHome.NumberofGuestsInRoom = this.bookUnique.NumberofGuestsInRoom;
    this.paginationService.setFilterValues(this.filterBookUniqueHome);
    this.serverCallFilterUniqueHome();
  }
  async serverCallFilterUniqueHome() {
    try {
      this.loaderService.show();
      const response = await this.bookService.getIndividualDetailWithFilters(this.paginationService.getParams());
      this.bookUniqueHomeSearchData = response.data.Result.data;
      this.total = response.data.Result.totalRecords;
      this.loaderService.hide();
    } catch (e) {
      // console.log(e);
      this.loaderService.hide();
    }
  }

  goToPage(n: number): void {
    this.page = n;
    let obj = {
      page: this.page,
      rows: this.limit
    }
    this.paginationService.setPageChange(obj);
    this.getBookIndividual();
  }

  onNext(): void {
    this.page++;
    this.getBookIndividual();
  }

  onPrev(): void {
    this.page--;
    this.getBookIndividual();
  }
}
