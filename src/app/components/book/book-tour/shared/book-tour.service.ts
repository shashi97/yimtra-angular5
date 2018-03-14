import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ApiUrl } from '../../../../api.service';
import {
    ObjectResponseModel,
    PostObjectResponseModel,
    ArrayResponseModel,
    AsyncArrayPromiseHandler,
    AsyncObjectPromiseHandler,
    BaseDataModel
} from '../../../../shared/models/base-data.model';
import { CityModel } from '../../../shared/city.model';
import { BookTourSearchData } from '..';
@Injectable()
export class BookTourService {

    constructor(private http: Http) { }
    
    getBookTours(params): Promise<ObjectResponseModel<BookTourSearchData>>  {

        const promise = this.http
            .get(ApiUrl.HOST_URI + 'HostTour/getBookTour/',{ params: params } );
            return new AsyncObjectPromiseHandler<BookTourSearchData>(promise.toPromise());
        }

        
    }
