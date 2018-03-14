import { Router } from '@angular/router';
import {
    Component,
    OnInit,
    Input,
    Output,
    ViewContainerRef,
    EventEmitter,
    HostListener,
    ElementRef
} from '@angular/core';
import { count } from 'rxjs/operators/count';
import { SignIn, LoginService, Token } from '../shared';
import { retry } from 'rxjs/operators/retry';
import { LoaderService } from '../../../core/loader/loader.service';
import { LocalStorageService } from '../../../shared/services';
import { CommonService } from '../../../shared/services';
import { Subscription } from 'rxjs/Subscription';
import { LoginEnum } from '../../../shared/enum/login.enum';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html'
})

export class SignInComponent implements OnInit {
    otp: number;
    passwordShow: boolean = false;
    emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    phonenoPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    isValid: boolean = false;
    userNameError: boolean = false;
    passwordError: boolean = false;
    signIn: SignIn = new SignIn();
    @Input() modalStatus: string = '';
    inputType = 'password';
    @Output() closeModal = new EventEmitter();
    private subscription: Subscription;
    loginBlock: boolean = true;
    otpVerifyBlock: boolean = false;
    forgetPasswordBlock: boolean = false;
    changePasswordBlock: boolean = false;
    rePassword: string = '';
    emailVerifyBlock: boolean = false;


    constructor(private eRef: ElementRef,
        private loginService: LoginService,
        private commonService: CommonService,
        private loaderService: LoaderService,
        private router: Router,
        private localStorageService: LocalStorageService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef, ) {
    }

    ngOnInit() {
        this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'onCallLogin') {
                this.saveSignIn(res.value, true);
            }
        });
    }

    switchModal(status) {
        this.signIn = new SignIn();
        this.modalStatus = status;
    }

    loginValidate() {
        let errorCount = 0;

        if (!this.emailPattern.test(this.signIn.UserName)) {
            errorCount++;
        }
        if (!this.phonenoPattern.test(this.signIn.UserName)) {
            errorCount++;
        }
        if (errorCount === 2) {
            this.isValid = true;
        } else {
            this.isValid = false;
        }
    }

    checkValidation() {
        let errorCount = 0;
        if (this.signIn.UserName.trim() === '') {
            this.userNameError = true;
            errorCount++;
        }
        if (this.signIn.Password.trim() === '') {
            this.passwordError = true;
            errorCount++;
        }
        if (errorCount > 0 || this.isValid) {
            return;
        }

        this.saveSignIn(this.signIn, false);
    }

    hidepassword(inputType) {
        this.passwordShow = !this.passwordShow;
        if (inputType === 'show') {
            this.inputType = 'text';
        } else {
            this.inputType = 'password';
        }
    }

    async  saveSignIn(signIn, isValidateCall) {
        this.loaderService.show();
        try {
            signIn.provider = LoginEnum.LIAMTRA;
            const response = await this.loginService.saveSignIn(signIn);
            let token = response.data.Result;
            if (token && token.AccessToken) {
                this.localStorageService.setCurrentUser(token);
            }
            this.loaderService.hide();
            if (!isValidateCall) {
                this.closeModal.emit();
            }
            this.commonService.notifyOther({ option: 'onSetHeader', value: true });
        } catch (e) {
            this.loaderService.hide();
            console.log(e);
        }
    }

    async forgetPasssword() {
        this.emailVerifyBlock = false;
        this.otpVerifyBlock = false;
        this.forgetPasswordBlock = false;
        let errorCount = 0;

        if (this.emailPattern.test(this.signIn.UserName)) {
            this.emailVerifyBlock = true;
        } else {
            errorCount++;
        }

        if (this.phonenoPattern.test(this.signIn.UserName)) {
            this.otpVerifyBlock = true;
        } else {
            errorCount++;
        }

        if (errorCount === 2) {
            this.forgetPasswordBlock = true;
            this.emailVerifyBlock = false;
            this.otpVerifyBlock = false;
            alert();
            this.toastr.warning('Please enter Email-Id/Phone-No.');
            return;
        }

        this.loaderService.show();
        try {
            const response = await this.loginService.resetPassword(this.signIn.UserName);
            if (response.data.Result) {
                this.forgetPasswordBlock = false;
            } else {
                this.forgetPasswordBlock = true;
                this.emailVerifyBlock = false;
                this.otpVerifyBlock = false;
                this.toastr.warning('Email-Id/Phone-No does not exists in our system!');
            }
            this.loaderService.hide();
        } catch (e) {
            this.loaderService.hide();
            console.log(e);
        }
    }

    async changePasswordEvent() {
        if (this.signIn.Password !== this.rePassword) {
            this.toastr.warning('Password & Confirm Password should be same.');
            return;
        }

        if (this.signIn.Password.length < 6) {
            this.toastr.warning('Password should be more than 6 words.');
            return;
        }

        this.loaderService.show();
        try {
            const response = await this.loginService.changePassword(this.signIn, 'mobile');
            if (response.data.Result) {
                this.changeBlockVisiblity('loginBlock');
            } else {
                this.toastr.warning('error');
            }
            this.loaderService.hide();
        } catch (e) {
            this.loaderService.hide();
            console.log(e);
        }
    }

    changeBlockVisiblity(type) {
        this.signIn.UserName = '';
        this.changePasswordBlock = false;
        this.forgetPasswordBlock = false;
        this.loginBlock = false;
        switch (type) {
            case 'loginBlock':
                this.loginBlock = true;
                return;
            case 'forgetPasswordBlock':
                this.forgetPasswordBlock = true;
                return;
        }

    }

    async  otpVerify() {
        if (this.otp.toString().length !== 6) {
            this.toastr.warning('OTP should be of 6 digits');
            return;
        }
        this.loaderService.show();
        try {
            const response = await this.loginService.validatePhoneOtp(this.otp, this.signIn.UserName);
            if (response.data.Result) {
                this.changePasswordBlock = true;
                this.otpVerifyBlock = false;
            } else {
                this.toastr.warning('error');
            }
            this.loaderService.hide();
        } catch (e) {
            this.loaderService.hide();
            console.log(e);
        }
    }
}
