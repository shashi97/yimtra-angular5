import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ApiUrl } from '../../../../../api.service';
import {
    ObjectResponseModel,
    PostObjectResponseModel,
    ArrayResponseModel,
    AsyncArrayPromiseHandler,
    AsyncObjectPromiseHandler
} from '../../../../../shared/models/base-data.model';
import { BookHomeCheckoutDetailModel } from './book-home-checkout.model';

@Injectable()
export class BookHomeCheckoutService {

    constructor(private http: Http) { }

    getBookUniqueDetail(obj): Promise<ObjectResponseModel<BookHomeCheckoutDetailModel>> {
        const params = {
            id: obj.svcId,
            name: obj.CityName,
            NumberOfGuest: obj.NumberofGuestsInRoom,
            checkIn: obj.CheckIn,
            checkOut: obj.CheckOut
        }
        const promise = this.http
            .get(ApiUrl.HOST_URI + 'BookService/individualDetail/', { params: params });
        return new AsyncObjectPromiseHandler<BookHomeCheckoutDetailModel>(promise.toPromise());
    }
    getHostChargesBySvcId(id): Promise<ArrayResponseModel<any>> {
        const promise = this.http
            .get(ApiUrl.HOST_URI + 'HostCharges/GetBySvcID/' + id);
        return new AsyncArrayPromiseHandler<any>(promise.toPromise());
    }

    bookUniqueHome(data: BookHomeCheckoutDetailModel): Promise<ObjectResponseModel<BookHomeCheckoutDetailModel>> {
        let promise = null;
        promise = this.http
            .post(ApiUrl.HOST_URI + 'BookService/addNewBookStay', data);
        return new AsyncObjectPromiseHandler<BookHomeCheckoutDetailModel>(promise.toPromise());
    }
}
