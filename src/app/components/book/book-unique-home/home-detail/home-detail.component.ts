import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { BookUniqueHomeService, BookUniqueHomeDetailModel, ReportListingModel } from '../shared';
import { BookUnique } from '../../shared/book-model';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const $: any;
import { PaginationService } from '../../../../shared/services';
import { BookUniqueHomeReportListing } from '../../../../core/dialog-component/book-unique-home-report/book-unique-home-report.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceCategoryEnum, ServiceFeeSubCategory } from '../../../../shared/enum/service-category-enum';
import { ApiUrl } from '../../../../api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LocalStorageService } from '../../../../shared/services/index';
import { AttachmentType } from '../../../../shared/enum/cms-sytem-enum';


@Component({
  selector: 'app-book-unique-home-detail',
  templateUrl: './home-detail.component.html'
})

export class BookUniqueHomeDetailComponent implements OnInit {
  @ViewChild('target') target;
  @ViewChild('overview') overview;
  @ViewChild('thehost') thehost;
  @ViewChild('location') location;
  modal: boolean = false;
  contactToHost: boolean = false;
  modalStatus: string = '';
  sliderCss: string = 'bookUniqueHomeDetail';
  reportListing: ReportListingModel = new ReportListingModel();
  homeDetail: BookUniqueHomeDetailModel = new BookUniqueHomeDetailModel();
  bookUnique: BookUnique = new BookUnique();
  locationCss: string = 'uniqueHomeMap';
  totalPrice: number = 0;
  totalRoomPrice: number = 0;
  numberOfDays: number = 0;
  constructor(private bookUniqueHomeService: BookUniqueHomeService,

    private router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    public paginationService: PaginationService,
    private loaderService: LoaderService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.bookUnique.svcId = this.route.snapshot.queryParams['svcId'];
    this.bookUnique.CheckIn = this.route.snapshot.queryParams['CheckIn'];
    this.bookUnique.CityName = this.route.snapshot.queryParams['CityName'];
    this.bookUnique.NumberofGuestsInRoom = this.route.snapshot.queryParams['NumberofGuestsInRoom'];
    this.bookUnique.CheckOut = this.route.snapshot.queryParams['CheckOut'];
    this.getNumberOfDays();
    this.getBookUniqueDetail();
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {

  }


  getNumberOfDays() {
    const checkInDateString = this.bookUnique.CheckIn;
    const checkOutDateString = this.bookUnique.CheckOut;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(this.bookUnique.CheckIn);
    const secondDate = new Date(this.bookUnique.CheckOut);
    this.numberOfDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    this.numberOfDays = this.numberOfDays === 0 ? 1 : this.numberOfDays;
  }

  async getBookUniqueDetail() {
    this.loaderService.show();
    try {
      this.paginationService.setFilterValues(this.bookUnique);
      const response = await this.bookUniqueHomeService.getBookUniqueDetail(this.paginationService.getParams());
      this.homeDetail = response.data.Result;
      this.homeDetail.language = '';
      this.homeDetail.serviceCategory.forEach(serviceCategory => {
        if (serviceCategory.svcCatgDesc === 'Languages') {
          serviceCategory.serviceSubCategory.forEach((serviceSubCategory, index) => {
            if (index === 0) {
              this.homeDetail.language = serviceSubCategory.svcSCatgDesc;
            } else {
              this.homeDetail.language += ',' + serviceSubCategory.svcSCatgDesc;
            }
          })
        }
      })
      this.homeDetail.images = [];
      this.homeDetail.videos = [];
      this.homeDetail.allAttachments.forEach(attach => {
        if (attach.attachmentType === AttachmentType.Image) {
          const obj = {
            imgSrc: ApiUrl.SRC_URI + attach.attachmentUrl,
            sType: 'img'
          }
          this.homeDetail.images.splice(this.homeDetail.images.length, 0, obj);
        } else if (attach.attachmentType === AttachmentType.Video) {
          let obj = {
            videoSrc: ApiUrl.SRC_URI + attach.attachmentUrl
          }
          this.homeDetail.videos.splice(this.homeDetail.images.length, 0, obj);
        }
      });
      this.homeDetail.serviceCategory.filter(item => {
        if (item.svcCatgId === ServiceCategoryEnum.Languages) {
          this.homeDetail.language = item.serviceSubCategory[0].svcSCatgDesc;
        }
      });
      this.totalRoomPrice = this.homeDetail.roomPrice * this.numberOfDays;
      this.totalPrice = this.totalRoomPrice;
      this.homeDetail.hostCharges.forEach(item => {
        if (item.svcSCatgId !== ServiceFeeSubCategory.RoomPrice) {
          this.totalPrice = this.totalPrice + item.amount;
        }
      });
      this.loaderService.hide();
    } catch (e) {
      this.loaderService.hide();
    }

  }

  routeHomeSearch() {
    this.router.navigate(['book/unique-homes-search'], {
      queryParams: {
        CityName: this.bookUnique.CityName,
        NumberofGuestsInRoom: this.bookUnique.NumberofGuestsInRoom, CheckIn: this.bookUnique.CheckIn,
        CheckOut: this.bookUnique.CheckOut
      }
    });
  }

  opemModal(modalStatus) {
    this.modalStatus = modalStatus;
    this.modal = true;
  }

  modalPopupEvent(result) {
    this.modal = result;
  }
  openContactToHostModal() {
    this.contactToHost = true;
  }

  contactToHostmodalPopupEvent(result) {
    this.contactToHost = result;
  }

  scroll(el) {
    if (el === 'target') {
      this.target.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    if (el === 'overview') {
      this.overview.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    if (el === 'thehost') {
      this.thehost.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    if (el === 'location') {
      this.location.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  async bookUniqueHome() {
    let isLogin: boolean = await this.checkUserLogin();
    if (isLogin) {
      this.router.navigate(['book/unique-home-checkout'], {
        queryParams: {
          StayId: this.homeDetail.stayId,
          CityName: this.bookUnique.CityName,
          SvcId: this.bookUnique.svcId,
          NumberofGuestsInRoom: this.bookUnique.NumberofGuestsInRoom, CheckIn: this.bookUnique.CheckIn,
          CheckOut: this.bookUnique.CheckOut, NumberOfDays: this.numberOfDays, TotalPrice: this.totalPrice
        }
      });
    }
  }

  async checkUserLogin() {
    try {
      const access_token = this.localStorageService.getAccessToken();
      if (access_token) {
        return true;
      } else {
        this.opemModal('signIn');
        return false;
      }
    } catch (e) { }
  }

  async openDialog() {
    let isLogin: boolean = await this.checkUserLogin();
    if (isLogin) {
      const dialogRef = this.dialog.open(BookUniqueHomeReportListing, {
        width: '1100px'
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          this.reportListing.svcId = this.bookUnique.svcId;
          this.reportListing.listingRemarks = result;
          try {
            this.loaderService.show();
            const response = await this.bookUniqueHomeService.reportUniqueHomeListing(this.reportListing);
            // console.log(response.data.Result);
            this.toastr.success('Reported Successfully ');
            this.loaderService.hide();
          } catch (e) {
            this.loaderService.hide();
          }
        }
      });
    }
  }


}
