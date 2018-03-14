import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ApiUrl } from '../../../api.service';
import { FilterBookUniqueHomeModel } from '../book-unique-home/shared/book-unique-home.model'
import {
    ObjectResponseModel,
    PostObjectResponseModel,
    ArrayResponseModel,
    AsyncArrayPromiseHandler,
    AsyncObjectPromiseHandler,
    BaseDataModel
} from '../../../shared/models/base-data.model';
import { BookUnique, BookUniqueHomeSearchData, ServiceSubCategoryModel } from './book-model';
import { CityModel } from '../../shared/city.model';
@Injectable()
export class BookService {

    constructor(private http: Http) { }

    getBookIndividual(params): Promise<ObjectResponseModel<BaseDataModel<BookUniqueHomeSearchData>>> {
        const promise = this.http
            .get(ApiUrl.HOST_URI + 'BookService/GetUniqueHomeListing/', { params: params });
        return new AsyncObjectPromiseHandler<BaseDataModel<BookUniqueHomeSearchData>>(promise.toPromise());
    }
    getServiceSubCategoryByServiceId(serviceCategoryId): Promise<ArrayResponseModel<ServiceSubCategoryModel>> {
        const promise = this.http
            .get(ApiUrl.MASTER_URI + 'ServiceSubCategory/list/' + serviceCategoryId);
        return new AsyncArrayPromiseHandler<ServiceSubCategoryModel>(promise.toPromise());

    }

    getCityListBySearchString(cityName): Promise<ArrayResponseModel<CityModel>> {
        const promise = this.http
            .get(ApiUrl.MASTER_URI + 'City/listForDestinationSearch/' + cityName);
        return new AsyncArrayPromiseHandler<CityModel>(promise.toPromise());
    }


    getIndividualDetailWithFilters(params): Promise<ObjectResponseModel<BaseDataModel<BookUniqueHomeSearchData>>> {
        const promise = this.http
            .get(ApiUrl.MASTER_URI + 'BookService/GetUniqueHomeListingByFilter/', { params: params });
        return new AsyncObjectPromiseHandler<BaseDataModel<BookUniqueHomeSearchData>>(promise.toPromise());
    }

    geExperiencetWithFilters(params): Promise<ObjectResponseModel<BaseDataModel<BookUniqueHomeSearchData>>> {
        const promise = this.http
            .get(ApiUrl.MASTER_URI + 'BookService/GetExperienceListingByFilters/', { params: params });
        return new AsyncObjectPromiseHandler<BaseDataModel<BookUniqueHomeSearchData>>(promise.toPromise());
    }

    geExperiencetById(params): Promise<ObjectResponseModel<BaseDataModel<BookUniqueHomeSearchData>>> {
        const promise = this.http
            .get(ApiUrl.MASTER_URI + 'BookService/GetExperienceListingIndividuals/', { params: params });
        return new AsyncObjectPromiseHandler<BaseDataModel<BookUniqueHomeSearchData>>(promise.toPromise());
    }

}
