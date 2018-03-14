import { Component, OnInit, Input, Output } from '@angular/core';
import { HostModel, HostService } from '../../shared';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';
import { ServiceSubCategoryModel } from '../../../shared/serviceCategory.model';

@Component({
  selector: 'app-host-exp-description',
  templateUrl: './description.component.html'
})

export class HostExperienceDescriptionComponent implements OnInit {
  @Input() hostModel: HostModel;
  public experienceData: Array<any> = [];
  public selectedExperience: Array<any> = new Array<any>();

  constructor(public hostService: HostService) {
    this.getServiceSubCategories(ServiceCategoryEnum.ExperienceType);
  }

  ngOnInit() {
  }

  async getServiceSubCategories(svcCatgId: number) {
    try {
      const result = await this.hostService.getServiceCategoryById(svcCatgId);
      if (svcCatgId === ServiceCategoryEnum.ExperienceType) {
        this.experienceData = result.data.Result;
        this.experienceData.map(x => {
          x.svcCatgId = x.svcCatgId,
            x.id = x.svcSCatgId,
            x.itemName = x.svcSCatgDesc
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  checkValidation() {
    let errorCount = 0;
    if (this.hostModel.remarks1.trim() === '') {
      errorCount++;
    }

    if (this.hostModel.remarks2.trim() === '') {
      errorCount++;
    }

    if (errorCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  onExperienceItemSelect(item: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories
      .concat(this.selectedExperience);
    this.hostModel.hostServiceLinkingSubCategories = Array
      .from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  OnExperienceItemDeSelect(item: any) {
    const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
    const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
    this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
  }

  onExperienceSelectAll(items: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(items);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  onExperienceDeSelectAll(items: any) {
    items.forEach(item => {
      const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
      const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
      this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
    });
  }

}
