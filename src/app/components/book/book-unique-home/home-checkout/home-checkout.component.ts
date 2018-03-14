import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { BookHomeCheckoutDetailModel, BookCharge, BookHomeCheckoutService, BookingDetailsModel } from './shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceFeeSubCategory, ServiceCategoryEnum, ServiceType } from '../../../../shared/enum/service-category-enum';
import { LoaderService } from '../../../../core/loader/loader.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BookGuestEntryComponent } from './guest-entry/guest-entry.component';
import { BookGuestIdentityComponent } from './guest-identity/guest-identity.component';

@Component({
  selector: 'app-home-checkout',
  templateUrl: './home-checkout.component.html'
})
export class BookHomeCheckoutComponent implements OnInit {
  @ViewChild(BookGuestEntryComponent) guestEntry: BookGuestEntryComponent;
  @ViewChild(BookGuestIdentityComponent) guestIdentity: BookGuestIdentityComponent;
  bookingDetails: BookingDetailsModel = new BookingDetailsModel();
  bookHomeCheckout: BookHomeCheckoutDetailModel = new BookHomeCheckoutDetailModel();
  public termAndConditionmodal: boolean = false;
  isTermAccepted: boolean = false;
  constructor(public bookHomeCheckoutService: BookHomeCheckoutService,
    private loaderService: LoaderService,
    public localStorageService: LocalStorageService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    public router: Router,
    public route: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.bookHomeCheckout.bookStay.genId = this.route.snapshot.queryParams['StayId'];
    this.bookingDetails.svcId = this.route.snapshot.queryParams['SvcId'];
    this.bookingDetails.CheckIn = this.route.snapshot.queryParams['CheckIn'];
    this.bookingDetails.CityName = this.route.snapshot.queryParams['CityName'];
    this.bookingDetails.NumberofGuestsInRoom = this.route.snapshot.queryParams['NumberofGuestsInRoom'];
    this.bookingDetails.CheckOut = this.route.snapshot.queryParams['CheckOut'];
    this.bookingDetails.numberOfDays = this.route.snapshot.queryParams['NumberOfDays'];
    this.bookingDetails.totalPrice = this.route.snapshot.queryParams['TotalPrice'];
    this.getHostChargesBySvcId();
  }

  async getHostChargesBySvcId() {
    const response = await this.bookHomeCheckoutService.getHostChargesBySvcId(this.bookingDetails.svcId);
    this.bookHomeCheckout.bookCharges = response.data.Result;
  }
  async bookUniqueHome() {
    let isError = this.guestEntry.checkValidation('All');
    isError = this.guestIdentity.checkValidation();
    if (isError) {
      return;
    }
    if (this.isTermAccepted) {
      const loggedInUserDetail = await this.localStorageService.getUserDetail();
      this.bookHomeCheckout.bookStay.checkIn = this.bookingDetails.CheckIn;
      this.bookHomeCheckout.bookStay.checkOut = this.bookingDetails.CheckOut;
      this.bookHomeCheckout.bookStay.noOfDays = this.bookingDetails.numberOfDays;
      this.bookHomeCheckout.bookStay.noOfAdultGuests = this.bookingDetails.NumberofGuestsInRoom;
      this.bookHomeCheckout.ownerUserId = loggedInUserDetail.UserId;
      this.bookHomeCheckout.svcId = this.bookingDetails.svcId;
      this.bookHomeCheckout.attachment.svcTypeId = ServiceType.UniqueHome;
      this.bookHomeCheckout.svcTypeId = ServiceType.UniqueHome;
      try {
        this.loaderService.show();
        const response = await this.bookHomeCheckoutService.bookUniqueHome(this.bookHomeCheckout);
        this.loaderService.hide();
        this.router.navigate(['book/unique-home-thank-you']);
      } catch (e) {
        this.loaderService.hide();
      }
    } else {
      this.toastr.warning('Please accept terms and conditions.');
      return;
    }
  }

  getTermsAndConditions() {
    this.termAndConditionmodal = true;
  }
  termsAndConditionsPopupEvent(event) {
    this.termAndConditionmodal = false;
  }

}