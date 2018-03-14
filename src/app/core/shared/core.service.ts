import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ApiUrl } from '../../api.service';
import {
    ObjectResponseModel,
    PostObjectResponseModel,
    ArrayResponseModel,
    AsyncArrayPromiseHandler,
    AsyncObjectPromiseHandler,
    BaseDataModel
} from '../../shared/models/base-data.model';

import { UserModal, SignUp } from '../login-modal-popup/shared';
import { CMSModel } from './core.model';


@Injectable()
export class CoreService {

    constructor(private http: Http) { }

    emailLinkVerification(email, link): Promise<ObjectResponseModel<SignUp>> {
        const promise = this.http
            .get(ApiUrl.MASTER_URI + 'ValidateUser/verifyAccount/' + link + '?email=' + email);
        return new AsyncObjectPromiseHandler<SignUp>(promise.toPromise());
    }

    saveUserDetails(user: UserModal): Promise<ObjectResponseModel<boolean>> {
        const promise = this.http
            .put(ApiUrl.MASTER_URI + 'User', user);
        return new AsyncObjectPromiseHandler<boolean>(promise.toPromise());
    }

    cmsResultById(systemId): Promise<ArrayResponseModel<CMSModel>> {
        const promise = this.http
            .get(ApiUrl.MASTER_URI + 'CMS/GetBySytemID/' + systemId);
        return new AsyncArrayPromiseHandler<CMSModel>(promise.toPromise());
    }

    getGender(): Promise<ArrayResponseModel<any>> {
        const promise = this.http
            .get(ApiUrl.MASTER_URI + 'ServiceSubCategory/getAllGender');
        return new AsyncArrayPromiseHandler<any>(promise.toPromise());
    }
}
