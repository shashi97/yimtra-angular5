import { HttpModule, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {
    ObjectResponseModel,
    PostObjectResponseModel,
    ArrayResponseModel,
    AsyncArrayPromiseHandler,
    AsyncObjectPromiseHandler
} from '../../../shared/models/base-data.model';
import { ApiUrl } from '../../../api.service';
import { SignIn, SignUp, Token, SocialModal } from './login.model';
import { SocialUser } from 'angularx-social-login';


@Injectable()
export class LoginService {
    constructor(private http: Http) {
    }

    saveSignIn(data: SignIn): Promise<ObjectResponseModel<Token>> {
        const promise = this.http.post(ApiUrl.LOGIN_URI + 'login', data);
        return new AsyncObjectPromiseHandler<Token>(promise.toPromise());
    }

    saveSignUp(data: SignUp): Promise<ObjectResponseModel<SignUp>> {
        const promise = this.http.post(ApiUrl.MASTER_URI + 'ValidateUser', data);
        return new AsyncObjectPromiseHandler<SignUp>(promise.toPromise());
    }

    validatePhoneOtp(phoneNo, otp): Promise<ObjectResponseModel<SignUp>> {
        const promise = this.http.get(ApiUrl.MASTER_URI + 'ValidateUser/verifyAccount/' + otp + '?phone=' + phoneNo);
        return new AsyncObjectPromiseHandler<SignUp>(promise.toPromise());
    }

    resetPassword(item): Promise<ObjectResponseModel<Token>> {
        const promise = this.http.post(ApiUrl.LOGIN_URI + 'User/resetPassword/' + item + '?isMobile=false', {});
        return new AsyncObjectPromiseHandler<Token>(promise.toPromise());
    }

    changePassword(data, type): Promise<ObjectResponseModel<any>> {
        let url = ApiUrl.LOGIN_URI + 'User/updatePassword/' + data.Password;
        let promise = null;
        if (type === 'Mobile') {
            promise = this.http.put(url + '?isMobile=' + data.UserName, {});
        } else {
            promise = this.http.put(url + '?email=' + data.UserName, {});
        }
        return new AsyncObjectPromiseHandler<any>(promise.toPromise());
    }

    emailVerify(otp, UserName): Promise<ObjectResponseModel<any>> {
        const promise = this.http.put(ApiUrl.LOGIN_URI + 'ValidateUser/verifyAccount/' + otp + '?email=' + UserName, {});
        return new AsyncObjectPromiseHandler<any>(promise.toPromise());
    }


}
