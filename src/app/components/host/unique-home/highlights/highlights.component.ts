import { Component, OnInit, Input } from '@angular/core';
import { HostModel, HostService } from '../../shared';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';
import { ServiceSubCategoryModel } from '../../../shared/serviceCategory.model';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html'
})
export class HighlightsComponent implements OnInit {

  @Input() hostModel: HostModel;
  public highlightsPlaces: Array<any> = new Array<any>();
  public placesGoodFor: Array<any> = new Array<any>();
  public dropdownSettings = {};
  public selectedHighlightsPlace: Array<any> = new Array<any>();
  public selectedPlace: Array<any> = new Array<any>();
  public aminitiesData: Array<any> = [];
  public bookingData: Array<any> = [];
  selectedBooking: any;
  public selectedAmenities: Array<any> = new Array<any>();
  public selectedCancellationPolicies: Array<any> = new Array<any>();
  public houseRules: Array<any> = [];
  public cancellationPolicies: Array<any> = [];
  public bookingTypes: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  public selectedRules: Array<any> = new Array<any>();


  constructor(private hostService: HostService) {
    // this.hostModel.hostStayDetail.checkOutTime.setDate(this.hostModel.hostStayDetail.checkInTime.getDate() + 1);
  }

  ngOnInit() {

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      searchAutofocus: true
    };
    this.getServiceSubCategories(ServiceCategoryEnum.Amenities);
    this.getServiceSubCategories(ServiceCategoryEnum.BookingPreferences);
    this.getServiceSubCategories(ServiceCategoryEnum.Highlights);
    this.getServiceSubCategories(ServiceCategoryEnum.PlaceType);
    this.getServiceSubCategories(ServiceCategoryEnum.BookingPreferences);
    this.getServiceSubCategories(ServiceCategoryEnum.HouseRules);
    this.getServiceSubCategories(ServiceCategoryEnum.CancellationPolicy);
    this.hostModel.hostStayDetail.checkOutTime.setDate(this.hostModel.hostStayDetail.checkInTime.getDate() + 1);
  }

  async getServiceSubCategories(svcCatgId: number) {
    try {

      const result = await this.hostService.getServiceCategoryById(svcCatgId);
      if (svcCatgId === ServiceCategoryEnum.BookingPreferences) {
        this.bookingTypes = result.data.Result;
      }

      if (svcCatgId === ServiceCategoryEnum.HouseRules) {
        this.houseRules = result.data.Result;
        this.houseRules.map(x => {
          x.svcCatgId = x.svcCatgId,
            x.id = x.svcSCatgId,
            x.itemName = x.svcSCatgDesc
        });
      }
      if (svcCatgId === ServiceCategoryEnum.CancellationPolicy) {
        this.cancellationPolicies = result.data.Result;
        this.cancellationPolicies.map(x => {
          x.svcCatgId = x.svcCatgId,
            x.id = x.svcSCatgId,
            x.itemName = x.svcSCatgDesc
        });
      }

      if (svcCatgId === ServiceCategoryEnum.Highlights) {
        this.highlightsPlaces = result.data.Result;
        this.highlightsPlaces.map(x => {
          x.svcCatgId = x.svcCatgId,
            x.id = x.svcSCatgId,
            x.itemName = x.svcSCatgDesc
        });
      }
      if (svcCatgId === ServiceCategoryEnum.PlaceType) {
        this.placesGoodFor = result.data.Result;
        this.placesGoodFor.map(x => {
          x.svcCatgId = x.svcCatgId,
            x.id = x.svcSCatgId,
            x.itemName = x.svcSCatgDesc
        });
      }

      if (svcCatgId === ServiceCategoryEnum.Amenities) {
        this.aminitiesData = result.data.Result;
        this.aminitiesData.map(x => {
          x.svcCatgId = x.svcCatgId,
            x.itemName = x.svcSCatgDesc,
            x.id = x.svcSCatgId
        });
      }
      if (svcCatgId === ServiceCategoryEnum.BookingPreferences) {
        this.bookingData = result.data.Result;
        let obj = {
          isActive: false,
          isDeleted: false,
          isNew: false,
          isSelected: false,
          svcCatgId: 0,
          svcSCatgCode: "4",
          svcSCatgId: 0,
          svcSCatgDesc: 'Please Select'
        }
        this.bookingData
          .splice(0, 0, obj);
      }
    } catch (e) { }
  }

  public onAmenityItemSelect(item: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(this.selectedAmenities);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public OnAmenityItemDeSelect(item: any) {
    const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
    const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
    this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
  }

  public onAmenitySelectAll(items: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(items);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public onAmenityDeSelectAll(items: any) {
    items.forEach(item => {
      const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
      const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
      this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
    });
  }

  public onPlaceSelect(item: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(this.selectedPlace);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public onHighlightSelect(item: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(this.selectedHighlightsPlace);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public OnPlaceDeSelect(item: any) {
    const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
    const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
    this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
  }

  public OnHighlightDeSelect(item: any) {
    const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
    const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
    this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
  }

  public onPlaceSelectAll(items: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(items);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public onPlaceDeSelectAll(items: any) {
    items.forEach(item => {
      const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
      const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
      this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
    });
  }

  public onHighlightSelectAll(items: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(items);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public onHighlightDeSelectAll(items: any) {
    items.forEach(item => {
      const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
      const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
      this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
    });
  }

  public onRuleSelect(item: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(this.selectedRules);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public OnRuleDeSelect(item: any) {
    const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
    const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
    this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
  }

  public onRuleSelectAll(items: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(items);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public onRuleDeSelectAll(items: any) {
    items.forEach(item => {
      const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
      const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
      this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
    });
  }

  public onPolicySelect(item: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories
      .concat(this.selectedCancellationPolicies);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public OnPolicyDeSelect(item: any) {
    const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
    const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
    this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
  }

  public onPolicySelectAll(items: any) {
    this.hostModel.hostServiceLinkingSubCategories = this.hostModel.hostServiceLinkingSubCategories.concat(items);
    this.hostModel.hostServiceLinkingSubCategories = Array.from(new Set(this.hostModel.hostServiceLinkingSubCategories));
  }

  public onPolicyDeSelectAll(items: any) {
    items.forEach(item => {
      const obj = this.hostModel.hostServiceLinkingSubCategories.filter(x => x.svcSCatgId === item.id)[0];
      const index = this.hostModel.hostServiceLinkingSubCategories.indexOf(obj);
      this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
    });
  }

  selectBookingPreferences() {
    const index = this.hostModel.hostServiceLinkingSubCategories.findIndex(x => x.svcSCatgId === this.selectedBooking.svcSCatgId)[0];
    if (index !== -1) {
      this.hostModel.hostServiceLinkingSubCategories.splice(index, 1);
    }
    this.hostModel.hostServiceLinkingSubCategories
      .splice(this.hostModel.hostServiceLinkingSubCategories.length, 0, this.selectedBooking);
  }

  checkValidation() {
    let errorCount = 0;
    if (this.selectedAmenities.length === 0 || this.selectedPlace.length === 0
      || this.selectedHighlightsPlace.length === 0 || this.selectedRules.length === 0
      || this.selectedCancellationPolicies.length === 0) {
      errorCount++;
    }

    if (this.selectedBooking && this.selectedBooking.svcSCatgId === 0) {
      errorCount++;
    }

    if (errorCount > 0) {
      return true;
    } else {
      return false;
    }
  }

}
