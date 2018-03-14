import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CoreService } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../core/loader/loader.service';
import { UserModal } from '../login-modal-popup/shared';
import { CommonService } from '../../shared/services';
import { LoginService } from '../login-modal-popup/shared/login.service';
import { LocalStorageService } from '../../shared/services';
import { LoginEnum } from '../../shared/enum/login.enum';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'app-user-verification',
    templateUrl: './user-verification.component.html'
})

export class UserVerificationComponent implements OnInit {
    tokenLink: string = '';
    status: boolean = true;
    gender: Array<any> = [];
    user: UserModal = new UserModal();
    emailDisabled: boolean = false;
    mobilelDisabled: boolean = false;
    isReset: boolean = false;
    emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    phonenoPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    rePassword: string = '';

    constructor(private coreService: CoreService,
        private router: Router,
        private loginService: LoginService,
        private loaderService: LoaderService,
        private localStorageService: LocalStorageService,
        public toastr: ToastsManager, vcr: ViewContainerRef,
        private commonService: CommonService,
        public route: ActivatedRoute) {
        this.toastr.setRootViewContainerRef(vcr);

        this.tokenLink = this.route.snapshot.queryParams['token'];
        this.user.UserEmail = this.route.snapshot.queryParams['email'] || '';
        this.user.UserContactNo = this.route.snapshot.queryParams['mobile'] || '';
        this.status = this.route.snapshot.queryParams['mobileStatus'];
        this.isReset = this.route.snapshot.queryParams['isReset'] === 'True' ? true : false;
        if (!this.isReset) {
            this.getGender();
        }
        this.emailDisabled = this.user.UserEmail === '' ? false : true;
        this.mobilelDisabled = this.user.UserContactNo && this.user.UserContactNo !== '' ? true : false;
        if (this.emailDisabled) {
            this.emailLinkVerification();
        }
    }

    ngOnInit() { }

    async emailLinkVerification() {
        this.loaderService.show();
        try {
            const response = await this.coreService.emailLinkVerification(this.user.UserEmail, this.tokenLink);
            const result = response.data.Result;
            this.status = true;
            const obj = {
                Password: result.userPwd,
                UserName: result.userEmail,
                provider: LoginEnum.LIAMTRA
            };
            if (!this.isReset) {
                this.login(obj);
            } else {
                this.loaderService.hide();
            }
        } catch (e) {
            this.status = false;
            this.loaderService.hide();
        }
    }

    async login(signIn) {
        try {
            this.loaderService.show();
            const response = await this.loginService.saveSignIn(signIn);
            let token = response.data.Result;
            if (token && token.AccessToken) {
                this.localStorageService.setCurrentUser(token);
            }
            this.loaderService.hide();
            this.commonService.notifyOther({ option: 'onSetHeader', value: true });
        } catch (e) {
            // console.log(e);
            this.loaderService.hide();
        }
    }

    async saveUseretail() {

        if (this.user.UserFirstName.trim() === '' || this.user.UserLastName.trim() === ''
            || this.user.Gender === 0) {
            this.toastr.warning('Please fill the mandatory fields.');
            return;
        }


        if ((!this.emailPattern.test(this.user.UserEmail))) {
            this.toastr.warning('Please enter valid email-id');
            return;
        }

        if ((!this.phonenoPattern.test(this.user.UserContactNo))) {
            this.toastr.warning('Please enter valid phone-no.');
            return;
        }

        this.loaderService.show();
        try {
            const response = await this.coreService.saveUserDetails(this.user);
            this.loaderService.hide();
            this.skipDetail();
        } catch (e) {
            this.loaderService.hide();
        }
    }

    async getGender() {
        this.loaderService.show();
        try {
            const response = await this.coreService.getGender();
            this.gender = response.data.Result;
            this.loaderService.hide();
        } catch (e) {
            console.log(e);
            this.loaderService.hide();
        }
    }

    skipDetail() {
        this.router.navigate(['']);
    }

    async updatePassword() {
        if (this.user.UserPwd.trim() === '') {
            this.toastr.warning('Both fields are mandatory');
            return;
        }
        if (this.user.UserPwd.trim() !== this.rePassword) {
            this.toastr.warning('Password should be same in both fields');
            return;
        }
        this.loaderService.show();
        try {
            let obj = {
                UserName: this.user.UserEmail,
                Password: this.user.UserPwd
            }
            const response = await this.loginService.changePassword(obj, 'Email');
            this.toastr.warning('Password changed successfully.');
            this.cancel();
            this.loaderService.hide();
        } catch (e) {
            console.log(e);
            this.loaderService.hide();
        }
    }

    cancel() {
        this.router.navigate(['']);
    }
}
