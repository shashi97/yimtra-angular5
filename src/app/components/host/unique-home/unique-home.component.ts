import { Component, OnInit, ViewContainerRef, Input, ViewChild } from '@angular/core';
import { HostModel, HostService } from '../shared';
import { ServiceCategoryEnum } from '../../../shared/enum/service-category-enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { LoaderService } from '../../../core/loader/loader.service';
import { ServiceType } from '../../../shared/enum/service-category-enum';
import { DetailComponent } from '../shared/detail/detail.component';
import { LocationComponent } from '../../shared/location/location.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { ListingComponent } from './listing/listing.component';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-unique-home',
  templateUrl: './unique-home.component.html'
})

export class UniqueHomeComponent implements OnInit {
  public hostModel: HostModel = new HostModel();
  @ViewChild(DetailComponent) detail: DetailComponent;
  @ViewChild(LocationComponent) location: LocationComponent;
  @ViewChild(ListingComponent) listing: ListingComponent;
  @ViewChild(HighlightsComponent) highlight: HighlightsComponent;
  stepNumber: number = 1;
  locationCss: string = 'hostExperinceMap';
  mapSearchString: string = '';
  hostTypeName = 'Host Name';
  modal: boolean = false;
  modalStatus: string = '';
  public termAndConditionmodal: boolean = false;

  constructor(private hostService: HostService,
    private loaderService: LoaderService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private localStorageService: LocalStorageService,
    private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.checkUserLogin();
  }

  async submit() {
    if (!this.hostModel.isTermAccepted) {
      this.toastr.warning('Please accept the terms & condition');
      return;
    }
    this.hostModel.svcTypeId = ServiceType.UniqueHome;
    this.hostModel.ownerUserId = 1;
    this.hostModel.hostStayDetail.svcTypeId = ServiceType.UniqueHome;
    this.hostModel.hostStayDetail.ownerUserId = 1;
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories))
    this.hostModel.hostStayDetail.numberOfBathRooms = Number(this.hostModel.hostStayDetail.numberOfBathRooms);
    this.hostModel.hostStayDetail.numberOfBeds = Number(this.hostModel.hostStayDetail.numberOfBeds);
    this.hostModel.hostStayDetail.numberOfRooms = Number(this.hostModel.hostStayDetail.numberOfRooms);
    this.hostModel.hostStayDetail.numberOfGuestsInRoom = Number(this.hostModel.hostStayDetail.numberOfGuestsInRoom);
    try {
      this.loaderService.show();
      const result = await this.hostService.saveHost(this.hostModel);
      this.loaderService.hide();
      this.router.navigate(['host/host-thank-you']);
    } catch (e) {
      this.loaderService.hide();
    }
  }

  backButton() {
    this.stepNumber = this.stepNumber - 1;
  }

  nextButton() {
    let errorOnPage = false;
    if (this.stepNumber === 1) {
      errorOnPage = this.detail.checkValidation('all');
    }
    if (this.stepNumber === 2) {
      errorOnPage = this.location.checkValidation();
    }
    if (this.stepNumber === 3) {
      errorOnPage = this.listing.checkValidation();
    }
    if (this.stepNumber === 4) {
      errorOnPage = this.highlight.checkValidation();
    }

    if (!errorOnPage) {
      let isLogin = this.detail.checkLogin();
      if (isLogin) {
        this.stepNumber = this.stepNumber + 1;
      } else {
        this.checkUserLogin();
      }
    }
  }

  tabSwitch(stepNumber) {
    if (this.stepNumber > stepNumber) {
      this.stepNumber = stepNumber;
    }
  }

  getCordinatesEvent(obj) {
    this.hostModel.latitude = obj.latitude;
    this.hostModel.longitude = obj.longitude;
  }

  onMapSearchEvent(searchItem) {
    this.mapSearchString = searchItem;
  }

  onSetCordinatesEvent(cordinates) {
    if (cordinates.cordinateEvent) {
      this.hostModel.latitude = cordinates.latitude;
      this.hostModel.longitude = cordinates.longitude;
    }
  }

  modalPopupEvent(result) {
    this.modal = result;
  }

  async checkUserLogin() {
    try {
      const access_token = this.localStorageService.getAccessToken();
      if (access_token) {
        return true;
      } else {
        this.modalStatus = 'signIn';
        this.modal = true;
        return false;
      }
    } catch (e) { }
  }

  getTermsAndConditions() {
    this.termAndConditionmodal = true;
  }

  termsAndConditionsPopupEvent(event) {
    this.termAndConditionmodal = false;
  }

}
