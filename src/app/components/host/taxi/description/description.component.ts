import { Component, OnInit, Input } from '@angular/core';
import { HostModel, HostService, HostVehicleRoute, HostVehicleRate } from '../../shared';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';
import { ServiceSubCategoryModel } from '../../../shared/serviceCategory.model';

@Component({
  selector: 'app-vehicle-vendor-detail',
  templateUrl: './description.component.html'
})

export class VehicleVendorDetailComponent implements OnInit {
  @Input() taxiModel: HostModel;
  vehicle: any;
  public vehicleTypes: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  constructor(public hostService: HostService) {

  }

  ngOnInit() {
    this.getServiceSubCategories(ServiceCategoryEnum.VehicleType);

    let vehicleRouteObj: HostVehicleRoute = new HostVehicleRoute();
    let vehicleRateObj: HostVehicleRate = new HostVehicleRate();
    this.taxiModel.hostVehicleRoute.splice(this.taxiModel.hostVehicleRoute.length, 0, vehicleRouteObj)
    this.taxiModel.hostVehicleRate.splice(this.taxiModel.hostVehicleRate.length, 0, vehicleRateObj)
  }

  async getServiceSubCategories(svcCatgId: number) {
    try {
      console.log('host vehicle desc');
      const result = await this.hostService.getServiceCategoryById(svcCatgId);
      if (svcCatgId === ServiceCategoryEnum.VehicleType) {
        this.vehicleTypes = result.data.Result;
      }
    } catch (e) { }
  }

  checkValidation() {
    let errorCount = 0;
    if (this.taxiModel.remarks1 === ''
      && this.taxiModel.hostVehicleRate.length === 0
      && this.taxiModel.hostVehicleRoute.length === 0) {
      errorCount++;
    }

    if (errorCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  addRoute(item: HostVehicleRoute, index: number) {
    let vehicleRouteObj: HostVehicleRoute = new HostVehicleRoute();
    if (index !== 0) {
      vehicleRouteObj.fromRoute = item.fromRoute;
      vehicleRouteObj.toRoute = item.toRoute;
    }
    this.taxiModel.hostVehicleRoute.splice(this.taxiModel.hostVehicleRoute.length, 0, vehicleRouteObj)
  }

  deleteRoute(index) {
    this.taxiModel.hostVehicleRoute.splice(index, 1);
  }

  addRate(item: HostVehicleRate, index: number) {
    let vehicleRateObj: HostVehicleRate = new HostVehicleRate();
    if (index !== 0) {
      vehicleRateObj.rate = item.rate;
      vehicleRateObj.vehicleType = item.vehicleType;
    }
    this.taxiModel.hostVehicleRate.splice(this.taxiModel.hostVehicleRate.length, 0, vehicleRateObj)
  }

  deleteRate(index) {
    this.taxiModel.hostVehicleRate.splice(index, 1);
  }
} 
