import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HostModel, HostService } from '../shared';
import { DetailComponent } from '../shared/detail/detail.component';
import { HostBusinessVendorDescriptionComponent } from './vendor-description/vendor-description.component';
import { LocationComponent } from '../../shared/location/location.component';
import { LoaderService } from '../../../core/loader/loader.service';
import { ServiceType } from '../../../shared/enum/service-category-enum';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})
export class HostBusinessComponent implements OnInit {
  businessModel: HostModel = new HostModel();
  @ViewChild(DetailComponent) detail: DetailComponent;
  @ViewChild(LocationComponent) location: LocationComponent;
  @ViewChild(HostBusinessVendorDescriptionComponent) description: HostBusinessVendorDescriptionComponent;
  stepNumber: number = 1;
  mapSearchElement: any;
  mapCss: string = 'hostExperinceMap';
  hostTypeName: string = 'Vender Name';
  modal: boolean = false;
  modalStatus: string = '';

  constructor(private loaderService: LoaderService,
    private route: ActivatedRoute,
    protected router: Router,
    private hostService: HostService,
    private localStorageService: LocalStorageService,
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

  getCordinatesEvent(obj) {
    this.businessModel.latitude = obj.latitude;
    this.businessModel.longitude = obj.longitude;
  }

  async submit() {
    if (!this.businessModel.isTermAccepted) {
      this.toastr.warning('Please accept the terms & condition');
      return;
    }
    this.businessModel.svcTypeId = ServiceType.Business
    this.businessModel.ownerUserId = 1;
    this.businessModel.svcStatus = 10; // will change accordingly now its static
    this.businessModel.hostStayDetail.svcTypeId = ServiceType.Business;
    this.businessModel.hostStayDetail.ownerUserId = 1;
    this.businessModel.hostServiceLinkingSubCategories = Array.from(new Set(this.businessModel.hostServiceLinkingSubCategories));

    try {
      this.loaderService.show();
      const result = await this.hostService.saveHost(this.businessModel);
      this.loaderService.hide();
      this.router.navigate(['']);
    } catch (e) {
      console.log(e);
      this.loaderService.hide();
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

}
