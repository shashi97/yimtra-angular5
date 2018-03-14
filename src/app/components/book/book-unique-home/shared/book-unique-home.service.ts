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
    AsyncObjectPromiseHandler
} from '../../../../shared/models/base-data.model';
import { BookUniqueHomeDetailModel,ReportListingModel } from './book-unique-home.model';

@Injectable()
export class BookUniqueHomeService {

    constructor(private http: Http) { }

    getBookUniqueDetail(params): Promise<ObjectResponseModel<BookUniqueHomeDetailModel>> {      
        const promise = this.http
            .get(ApiUrl.HOST_URI + 'BookService/GetUniqueHomeIndividuals/', { params: params });
        return new AsyncObjectPromiseHandler<BookUniqueHomeDetailModel>(promise.toPromise());
    }

    sendContactHostMessage(params): Promise<ObjectResponseModel<BookUniqueHomeDetailModel>> {      
      const promise = this.http
          .post(ApiUrl.HOST_URI + 'SocialDetails', params);
      return new AsyncObjectPromiseHandler<BookUniqueHomeDetailModel>(promise.toPromise());
    }

    
    reportUniqueHomeListing(obj): Promise<ObjectResponseModel<ReportListingModel>> {
    
      const promise = this.http
          .post(ApiUrl.HOST_URI + 'Listing', obj);
      return new AsyncObjectPromiseHandler<ReportListingModel>(promise.toPromise());
  }

}
