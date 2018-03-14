import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ApiUrl } from '../../../../api.service';
import { TaxiDetailModel } from '../shared/index';
import {
    ObjectResponseModel,
    PostObjectResponseModel,
    ArrayResponseModel,
    AsyncArrayPromiseHandler,
    AsyncObjectPromiseHandler,
    BaseDataModel
} from '../../../../shared/models/base-data.model';
// import { BookUniqueHomeDetailModel,ReportListingModel } from './book-unique-home.model';

@Injectable()
export class BookTaxiService {

    constructor(private http: Http) { }
    getBookIndividual(params): Promise<ObjectResponseModel<BaseDataModel<TaxiDetailModel>>> {
      const promise = this.http
          .get(ApiUrl.HOST_URI + 'BookService/GetTaxiListing', { params: params });
      return new AsyncObjectPromiseHandler<BaseDataModel<TaxiDetailModel>>(promise.toPromise());
  }
  getBookTaxiDetail(params): Promise<ObjectResponseModel<TaxiDetailModel>> {      
    const promise = this.http
        .get(ApiUrl.HOST_URI + 'BookService/GetTaxiListingIndividuals', { params: params });
    return new AsyncObjectPromiseHandler<TaxiDetailModel>(promise.toPromise());
  }

  //   getBookUniqueDetail(params): Promise<ObjectResponseModel<BookUniqueHomeDetailModel>> {      
  //       const promise = this.http
  //           .get(ApiUrl.HOST_URI + 'BookService/GetUniqueHomeIndividuals/', { params: params });
  //       return new AsyncObjectPromiseHandler<BookUniqueHomeDetailModel>(promise.toPromise());
  //   }

    
  //   reportUniqueHomeListing(obj): Promise<ObjectResponseModel<ReportListingModel>> {
    
  //     const promise = this.http
  //         .post(ApiUrl.HOST_URI + 'Listing', obj);
  //     return new AsyncObjectPromiseHandler<ReportListingModel>(promise.toPromise());
  // }

}
