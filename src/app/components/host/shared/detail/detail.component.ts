import { Component, ViewContainerRef, OnInit, Input } from '@angular/core';
import { HostModel, HostService } from '../../shared';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';
import { ServiceSubCategoryModel } from '../../../shared/serviceCategory.model';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-host-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  @Input() hostModel: HostModel;
  @Input() hostTypeName: string = '';
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phonenoPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  languages: Array<any> = [];
  public selectedLanguages: Array<any> = new Array<any>();
  isContactInvalid: boolean = false;
  isEmailInvalid: boolean = false;
  constructor(public hostService: HostService,
    private localStorageService: LocalStorageService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getServiceCategories();
    this.getServiceSubCategories(ServiceCategoryEnum.Languages);
    let user = this.localStorageService.getCurrentUser().User
    this.hostModel.eMailId = user.UserEmail
    this.hostModel.contactNo = user.UserContactNo
  }

  async getServiceCategories() {
    try {
      await this.hostService.getServiceCategoryList();
    } catch (e) {
      // console.log(e);
    }
  }

  async getServiceSubCategories(id: number) {
    try {
      const response = await this.hostService.getServiceCategoryById(id);
      this.languages = response.data.Result;
      this.languages.map(x => {
        x.svcCatgId = x.svcCatgId,
          x.itemName = x.svcSCatgDesc,
          x.id = x.svcSCatgId
      });
    } catch (e) {
      // console.log(e);
    }
  }

  public onLanguageItemSelect(item: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(this.selectedLanguages);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public onLanguageItemDeSelect(item: any) {
    const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
    const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
    this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
  }

  public onLanguageSelectAll(items: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(items);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public onLanguageDeSelectAll(items: any) {
    items.forEach(item => {
      const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
      const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
      this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
    });
  }

  checkLogin(): boolean {
    let islogin = false;
    const access_token = this.localStorageService.getAccessToken();
    if (access_token) {
      islogin = true
    }
    return islogin;
  }

  checkValidation(type) {

    let errorCount = 0;
    let error = '';
    if (this.hostModel.svcName.trim() === '') {
      if (type === 'name') {
        this.toastr.warning('Please enter the name');
      }
      errorCount++;
    }

    if ((this.hostModel.eMailId.trim() === '' ||
      !this.emailPattern.test(this.hostModel.eMailId))) {
      this.isEmailInvalid = true;
      if (type === 'email') {
        this.toastr.warning('Please enter the email-id');
      }
      errorCount++;
    } else {
      this.isEmailInvalid = false;
    }

    if ((this.hostModel.contactNo.trim() === '' ||
      !this.phonenoPattern.test(this.hostModel.contactNo))) {
      this.isContactInvalid = true;
      if (type === 'phone') {
        this.toastr.warning('Please enter the phone-no');
      }
      errorCount++;
    } else {
      this.isContactInvalid = false;
    }

    if (this.selectedLanguages.length === 0) {
      errorCount++;
    }

    if (errorCount > 0) {
      if (type === 'all') {
        this.toastr.warning('Please fill the mandatory fields');
      }
      return true;
    } else {
      return false;
    }
  }
}
