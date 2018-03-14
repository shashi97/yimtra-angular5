import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HostModel, HostService } from '../shared';
import { LoaderService } from '../../../core/loader/loader.service';
import { ServiceType } from '../../../shared/enum/service-category-enum';
import { DetailComponent } from '../shared/detail/detail.component';
import { LocationComponent } from '../../shared/location/location.component';
import { HostExperienceDescriptionComponent } from './description/description.component';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html'
})
export class HostExperienceComponent implements OnInit {

  stepNumber: number = 1;
  @ViewChild(DetailComponent) detail: DetailComponent;
  @ViewChild(HostExperienceDescriptionComponent) description: HostExperienceDescriptionComponent;
  @ViewChild(LocationComponent) location: LocationComponent;
  experienceModel: HostModel = new HostModel();
  mapSearchElement: any;
  mapCss: string = 'hostExperinceMap';
  hostTypeName: string = 'Host Name';
  modal: boolean = false;
  modalStatus: string = '';

  constructor(protected hostService: HostService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    protected router: Router,
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

  async saveExperience() {
    if (!this.experienceModel.isTermAccepted) {
      this.toastr.warning('Please accept the terms & condition');
      return;
    }
    this.experienceModel.svcTypeId = ServiceType.Experience
    this.experienceModel.ownerUserId = 1;// will change accordingly now its static
    this.experienceModel.svcStatus = 10; // will change accordingly now its static
    this.experienceModel.hostStayDetail.svcTypeId = ServiceType.Experience;
    this.experienceModel.hostStayDetail.ownerUserId = 1;
    this.experienceModel.hostServiceLinkingSubCategories = Array.from(new Set(this.experienceModel.hostServiceLinkingSubCategories));

    try {
      this.loaderService.show();
      const result = await this.hostService.saveHost(this.experienceModel);
      this.loaderService.hide();
      this.router.navigate(['']);
    } catch (e) {
      console.log(e);
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
    this.experienceModel.latitude = obj.latitude;
    this.experienceModel.longitude = obj.longitude;
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
