import { Component, OnInit, Input } from '@angular/core';
import { HostModel, HostService } from '../../shared';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';

@Component({
  selector: 'app-vendor-description',
  templateUrl: './vendor-description.component.html'
})
export class HostBusinessVendorDescriptionComponent implements OnInit {
  @Input() businessModel: HostModel;
  public serviceData: Array<any> = [];
  public selectedService: Array<any> = new Array<any>();

  constructor(public hostService: HostService) { }

  ngOnInit() {
    this.getServiceSubCategories(ServiceCategoryEnum.BusinessKeywords);
  }

  async getServiceSubCategories(svcCatgId: number) {
    try {
      const result = await this.hostService.getServiceCategoryById(svcCatgId);
      if (svcCatgId === ServiceCategoryEnum.BusinessKeywords) {
        this.serviceData = result.data.Result;
        this.serviceData.map(x => {
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
    if (this.businessModel.remarks1.trim() === '') {
      errorCount++;
    }

    if (errorCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  onServiceItemSelect(item: any) {
    this.businessModel.hostServiceLinkingSubCategories = this.businessModel.hostServiceLinkingSubCategories
      .concat(this.selectedService);
    this.businessModel.hostServiceLinkingSubCategories = Array
      .from(new Set(this.businessModel.hostServiceLinkingSubCategories));
  }

  OnServiceItemDeSelect(item: any) {
    const obj = this.businessModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
    const index = this.businessModel.hostServiceLinkingSubCategories.indexOf(obj);
    this.businessModel.hostServiceLinkingSubCategories.splice(index, 1);
  }

  onServiceSelectAll(items: any) {
    this.businessModel.hostServiceLinkingSubCategories = this.businessModel.hostServiceLinkingSubCategories.concat(items);
    this.businessModel.hostServiceLinkingSubCategories = Array.from(new Set(this.businessModel.hostServiceLinkingSubCategories));
  }

  onServiceDeSelectAll(items: any) {
    items.forEach(item => {
      const obj = this.businessModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
      const index = this.businessModel.hostServiceLinkingSubCategories.indexOf(obj);
      this.businessModel.hostServiceLinkingSubCategories.splice(index, 1);
    });
  }

}
