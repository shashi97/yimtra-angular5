
import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ApiUrl } from '../../../api.service';
import {
    ObjectResponseModel,
    PostObjectResponseModel,
    ArrayResponseModel,
    AsyncArrayPromiseHandler,
    AsyncObjectPromiseHandler,
    BaseDataModel
} from '../../../shared/models/base-data.model';
import { CityModel } from '../../shared/city.model';
import { CustomDDO } from '../custom-ddo.model';
@Injectable()
export class MasterService {

  constructor(private http: Http) { }

 getMonths() {
     const data: any = [{monthValue:1 ,monthName:'Jan'},
                        {monthValue:1 ,monthName:'Feb'},
                        {monthValue:1 ,monthName:'Mar'},
                        {monthValue:1 ,monthName:'Apr'},
                        {monthValue:1 ,monthName:'May'},
                        {monthValue:1 ,monthName:'Jun'},
                        {monthValue:1 ,monthName:'Jul'},
                        {monthValue:1 ,monthName:'Aug'},
                        {monthValue:1 ,monthName:'Sep'},
                        {monthValue:1 ,monthName:'Oct'},
                        {monthValue:1 ,monthName:'Nov'},
                        {monthValue:1 ,monthName:'Dec'}];
                        
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.monthName, value: item.monthValue }
      results.push(obj);
    });
    return results;
  }



}
