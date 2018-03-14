import { Component, OnInit, Input } from '@angular/core';
import { HostModel, HostService, HostServiceLinkingSubCategories } from '../../shared';

import { ServiceSubCategoryModel } from '../../../shared/serviceCategory.model';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html'
})
export class ListingComponent implements OnInit {
  @Input() hostModel: HostModel;

  public likeList: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  public feeList: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  public properties: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  public rooms: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  public beds: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  public bathrooms: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  public amenities: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  public obj: HostServiceLinkingSubCategories = new HostServiceLinkingSubCategories();
  public settings = {};
  public tempSelectedItems = [{
    svcId: 0,
    svcCatgId: 0,
    svcSCatgId: 0,
    isActive: true
  }];

  constructor(public hostService: HostService) { }

  ngOnInit() {

    this.settings = {
      singleSelection: false,
      text: 'Select',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.getServiceSubCategories(ServiceCategoryEnum.RoomType);
    this.getServiceSubCategories(ServiceCategoryEnum.PropertyType);
    this.getServiceSubCategories(ServiceCategoryEnum.TotalRooms);
    this.getServiceSubCategories(ServiceCategoryEnum.TotalBeds);
    this.getServiceSubCategories(ServiceCategoryEnum.TotalBathrooms);
    this.getServiceSubCategories(ServiceCategoryEnum.Amenities);
    this.getServiceSubCategories(ServiceCategoryEnum.Fees);
  }



  async getServiceSubCategories(svcCatgId: number) {
    try {
      const result = await this.hostService.getServiceCategoryById(svcCatgId);
      if (svcCatgId === ServiceCategoryEnum.RoomType) {
        this.likeList = result.data.Result;
      }

      if (svcCatgId === ServiceCategoryEnum.PropertyType) {
        this.properties = result.data.Result;
      }

      if (svcCatgId === ServiceCategoryEnum.TotalRooms) {
        this.rooms = result.data.Result;
      }

      if (svcCatgId === ServiceCategoryEnum.TotalBeds) {
        this.beds = result.data.Result;
      }

      if (svcCatgId === ServiceCategoryEnum.TotalBathrooms) {
        this.bathrooms = result.data.Result;
      }

      if (svcCatgId === ServiceCategoryEnum.Fees) {
        this.feeList = result.data.Result;
        this.feeList.forEach(fee => {
          const obj = {
            svcId: 0,
            svcCatgId: fee.svcCatgId,
            svcSCatgId: fee.svcSCatgId,
            amount: 0,
            isActive: true
          };
          if (fee.svcSCatgDesc === 'Service Tax') {
            this.hostModel.hostCharges.splice(this.hostModel.hostCharges.length, 0, obj);
          }
          if (fee.svcSCatgDesc === 'Occupancy Tax') {
            this.hostModel.hostCharges.splice(this.hostModel.hostCharges.length, 0, obj);
          }
        });
      }
    } catch (e) {
      // console.log(e);
    }
  }

  checkValidation() {
    let errorCount = 0;
    if (this.hostModel.hostStayDetail.listType === 0 || this.hostModel.hostStayDetail.propertyType === 0
      || this.hostModel.hostStayDetail.stayName === '' || this.hostModel.hostStayDetail.numberOfRooms === 0
      || this.hostModel.hostStayDetail.numberOfBeds === 0 || this.hostModel.hostStayDetail.numberOfBathRooms === 0
      || this.hostModel.hostStayDetail.numberOfGuestsInRoom === 0 || this.hostModel.hostStayDetail.roomPrice === 0) {
      errorCount++;
    }

    if (errorCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  hostChargeAddEvent(itemIndex) {
    let item = null;
    if (itemIndex === 0) {
      item = this.feeList.find(i => i.svcSCatgDesc === 'Room Price');
    } else {
      item = this.feeList.find(i => i.svcSCatgDesc === 'Cleaning Fee');
    }


    const obj = {
      svcId: 0,
      svcCatgId: item.svcCatgId,
      svcSCatgId: item.svcSCatgId,
      amount: 0,
      isActive: true
    };

    if (itemIndex === 0) {
      obj.amount = this.hostModel.hostStayDetail.roomPrice;
    } else {
      obj.amount = this.hostModel.hostStayDetail.cleaningFee;
    }
    const index = this.hostModel.hostCharges.findIndex(i => i.svcCatgId === obj.svcCatgId
      && i.svcSCatgId === obj.svcSCatgId);
    if (index !== -1) {
      this.hostModel.hostCharges.splice(index, 1);
    }
    this.hostModel.hostCharges.splice(this.hostModel.hostCharges.length, 0, obj);
  }

  selectedItem() { }

}
