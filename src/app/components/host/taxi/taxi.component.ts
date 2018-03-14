import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LocationComponent } from '../../shared/location/location.component';
import { LoaderService } from '../../../core/loader/loader.service';
import { ServiceType } from '../../../shared/enum/service-category-enum';
import { Router, ActivatedRoute } from '@angular/router';
import { HostModel, HostService } from '../shared';
import { DetailComponent } from '../shared/detail/detail.component';
import { VehicleVendorDetailComponent } from './description/description.component';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.component.html'
})
export class TaxiComponent implements OnInit {

  taxiModel: HostModel = new HostModel();
  @ViewChild(DetailComponent) detail: DetailComponent;
  @ViewChild(LocationComponent) location: LocationComponent;
  @ViewChild(VehicleVendorDetailComponent) description: VehicleVendorDetailComponent;
  stepNumber: number = 1;
  mapSearchElement: any;
  mapCss: string = 'hostExperinceMap';
  hostTypeName = 'Car Vendor Name';
  modal: boolean = false;
  modalStatus: string = '';

  constructor(private loaderService: LoaderService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    protected router: Router,
    private hostService: HostService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.checkUserLogin();
  }

  getMapSearch(item) {
    // if (!item.cordinateEvent) {
    this.mapSearchElement = item;
    // }
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
      errorOnPage = this.description.checkValidation();
    }

    if (!errorOnPage) {
      let isLogin = this.detail.checkLogin();
      if (isLogin) {
        this.stepNumber = this.stepNumber + 1;
      } else {
        this.toastr.warning('Please Login before host any unique home');
        this.checkUserLogin();
      }
    }
  }

  tabSwitch(stepNumber) {
    if (this.stepNumber > stepNumber) {
      this.stepNumber = stepNumber;
    }
  }

  async submit() {
    if (!this.taxiModel.isTermAccepted) {
      this.toastr.warning('Please accept the terms & condition');
      return;
    }
    this.taxiModel.svcTypeId = ServiceType.Taxi
    this.taxiModel.ownerUserId = 1;
    this.taxiModel.svcStatus = 10;
    this.taxiModel.hostStayDetail.svcTypeId = ServiceType.Taxi;
    this.taxiModel.hostStayDetail.ownerUserId = 1;
    this.taxiModel.hostServiceLinkingSubCategories = Array.from(new Set(this.taxiModel.hostServiceLinkingSubCategories));

    try {
      this.loaderService.show();
      const result = await this.hostService.saveHost(this.taxiModel);
      this.loaderService.hide();
      this.router.navigate(['']);
    } catch (e) {
      console.log(e);
      this.loaderService.hide();
    }
  }

  getCordinatesEvent(obj) {
    this.taxiModel.latitude = obj.latitude;
    this.taxiModel.longitude = obj.longitude;
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

}
