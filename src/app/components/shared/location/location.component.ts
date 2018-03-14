
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewContainerRef } from '@angular/core';
import { ErrorService, ErrorModel } from '../../../shared/services';
import { HostService, HostModel } from '../../../components/host/shared';
import { CountryModel } from '../country.model';
import { CityModel } from '../city.model';
import { StateModel } from '../state.model';
import { LoaderService } from '../../../core/loader/loader.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit, OnChanges {
  @Input() hostModel: HostModel;
  @Input() mapSettingName: string = '';

  public cities: Array<CityModel> = new Array<CityModel>();
  public countries: Array<CountryModel> = new Array<CountryModel>();
  public states: Array<StateModel> = new Array<StateModel>();
  @Output() onSearchElement = new EventEmitter();
  @Output() onSetCordinates = new EventEmitter();


  constructor(private hostService: HostService,
    private errorService: ErrorService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private loaderService: LoaderService
  ) {
    // this.hostModel = new HostModel();
  }

  ngOnInit() {
    this.getCountries();
  }

  ngOnChanges() {
    // console.log(this.hostModel);
    if (this.hostModel.countryId > 0) {
      this.getStates(this.hostModel.countryId);
    }
  }

  async  getCountries() {
    try {
      this.loaderService.show();
      const response = await this.hostService.getCountries();
      this.countries = response.data.Result;
      this.loaderService.hide();
    } catch (e) {
      // console.log(e);
      this.loaderService.hide();
    }
  }

  async getStates(countryId) {
    try {
      this.loaderService.show();
      const response = await this.hostService.getStates(countryId);
      this.states = response.data.Result;
      if (this.hostModel.cityId > 0) {
        this.getCities(this.hostModel.stateId);
      }
      this.loaderService.hide();
      this.searchMapEvent();
    } catch (e) {
      this.loaderService.hide();
      // console.log(e);
    }
  }

  async getCities(stateId) {
    try {
      this.loaderService.show();
      const response = await this.hostService.getCities(stateId);
      this.cities = response.data.Result;
      this.loaderService.hide();
      this.searchMapEvent();
    } catch (e) {
      // console.log(e);
      this.loaderService.hide();
    }
  }

  public selectCountry(selectedCountryId: number) {
    this.getStates(selectedCountryId);
  }

  searchMapEvent() {
    let searchItem = '';
    const countryItem = this.countries.find(i => i.countryId === this.hostModel.countryId);
    const stateItem = this.states.find(i => i.stateId === this.hostModel.stateId);
    const cityItem = this.cities.find(i => i.cityId === this.hostModel.cityId);
    if (countryItem) {
      searchItem = countryItem.countryName;
    }
    if (stateItem) {
      searchItem += ',' + stateItem.stateName;
    }
    if (cityItem) {
      searchItem += ',' + cityItem.cityName;
    }
    this.onSearchElement.emit(searchItem);
    this.mapSettingName = searchItem;
  }

  public selectState(selectedStateId: number) {
    this.getCities(selectedStateId);
  }

  checkValidation() {
    let errorCount = 0;
    if (this.hostModel.cityId === 0 || this.hostModel.address1 === ''
      || this.hostModel.address2 === '' || this.hostModel.zipCode === 0
      || this.hostModel.latitude === 0 || this.hostModel.longitude === 0) {
      errorCount++;
    }

    if (errorCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  searchByCordinate() {
    if (this.hostModel.latitude !== 0 && this.hostModel.longitude !== 0) {
      let obj = {
        cordinateEvent: true,
        latitude: this.hostModel.latitude,
        longitude: this.hostModel.longitude
      }
      this.onSetCordinates.emit(obj);
    } else {
      this.toastr.error('Please enter both cordinates for map refresh', 'Alert!');
    }
  }

}
