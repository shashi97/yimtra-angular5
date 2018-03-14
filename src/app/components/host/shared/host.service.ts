import { HttpModule, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {
    ObjectResponseModel,
    PostObjectResponseModel,
    ArrayResponseModel,
    AsyncArrayPromiseHandler,
    AsyncObjectPromiseHandler
} from '../../../shared/models/base-data.model';
import { ApiUrl } from '../../../api.service';
import { ServiceCategoryModel, ServiceSubCategoryModel } from '../../../components/shared/serviceCategory.model';
import { CountryModel } from '../../../components/shared/country.model';
import { StateModel } from '../../../components/shared/state.model';
import { CityModel } from '../../../components/shared/city.model';
import { HostModel } from './host.model';
import { ServiceSubCategory } from '../../book/book-unique-home';


@Injectable()
export class HostService {
    constructor(private http: Http) {
    }

    async getServiceCategoryList(): Promise<ArrayResponseModel<ServiceCategoryModel>> {
        const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceCategory/list');
        return new AsyncArrayPromiseHandler<ServiceCategoryModel>(promise.toPromise());
    }

    async getServiceCategoryById(id): Promise<ArrayResponseModel<ServiceSubCategory>> {
        const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceSubCategory/list/' + id);
        return new AsyncArrayPromiseHandler<ServiceSubCategory>(promise.toPromise());
    }

    async getCountries(): Promise<ArrayResponseModel<CountryModel>> {
        const promise = this.http.get(ApiUrl.MASTER_URI + 'Country/listForCombo');
        return new AsyncObjectPromiseHandler<any>(promise.toPromise());
    }


    async getStates(countryId: number): Promise<ArrayResponseModel<StateModel>> {
        const promise = this.http.get(ApiUrl.MASTER_URI + 'State/list/' + countryId);
        return new AsyncArrayPromiseHandler<StateModel>(promise.toPromise());
    }

    async getCities(stateId: number): Promise<ArrayResponseModel<CityModel>> {
        const promise = this.http.get(ApiUrl.MASTER_URI + 'City/list/' + stateId);
        return new AsyncArrayPromiseHandler<CityModel>(promise.toPromise());
    }

    saveServiceCategoryDetails(data: ServiceCategoryModel): Promise<ObjectResponseModel<ServiceCategoryModel>> {
        let promise = null;
        if (Number(data.svcCatgId) > 0) {
            promise = this.http
                .put(ApiUrl.MASTER_URI + 'ServiceCategory', data);
        } else {
            promise = this.http
                .post(ApiUrl.MASTER_URI + 'ServiceCategory', data);
        }
        return new AsyncObjectPromiseHandler<ServiceCategoryModel>(promise.toPromise());
    }

    saveHost(data: HostModel): Promise<ObjectResponseModel<HostModel>> {
        let promise = null;
        promise = this.http
            .post(ApiUrl.HOST_URI + 'HostService', data);
        return new AsyncObjectPromiseHandler<HostModel>(promise.toPromise());
    }

}
