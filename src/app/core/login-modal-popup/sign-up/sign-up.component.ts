import { Router } from '@angular/router';
import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    HostListener,
    ElementRef
} from '@angular/core';
import { count } from 'rxjs/operators/count';
import { SignUp, LoginService } from '../shared';
import { retry } from 'rxjs/operators/retry';
import { LoaderService } from '../../../core/loader/loader.service';
import { CommonService } from '../../../shared/services';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
    passwordShow: boolean = false;
    @Input() modalStatus: string = '';
    // @Input() termsAndConditionsModal: boolean = false;
    @Output() closeModal = new EventEmitter();
    @Output() termsAndConditionsModal = new EventEmitter();
    emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    phonenoPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    signUp: SignUp = new SignUp();
    mobileOTP: number;
    validationError: boolean = false;
    emailError: boolean = false;
    phoneError: boolean = false;
    mobileDivEnabled: boolean = false;
    emailDivEnabled: boolean = false;
    combinedErrorMessage: boolean = false;
    inputType = 'password';
    // public termAndConditionmodal: boolean = false;
    constructor(private eRef: ElementRef,
        private loginService: LoginService,
        private commonService: CommonService,
        private loaderService: LoaderService,
        public toastr: ToastsManager,
        private router: Router) {
    }

    ngOnInit() {
    }

    loginValidate() {
        this.emailError = false;
        this.phoneError = false;
        this.combinedErrorMessage = false;

        if (this.signUp.userEmail.trim() !== '' && !this.emailPattern.test(this.signUp.userEmail)) {
            this.emailError = true;
        }

        if (this.signUp.userContactNo && !this.phonenoPattern.test(this.signUp.userContactNo.toString())) {
            this.phoneError = true;
        }
    }

    hidepasswords(inputType) {
        this.passwordShow = !this.passwordShow;
        if (inputType === 'show') {
            this.inputType = 'text';
        } else {
            this.inputType = 'password';
        }
    }


    async saveSignUp() {
        this.combinedErrorMessage = false;
        let errorCount = 0;
        this.validationError = false;
        if (this.signUp.userEmail.trim() === '') {
            errorCount++;
        }
        if (!this.signUp.userContactNo) {
            errorCount++;
        }
        if (errorCount === 2) {
            this.validationError = true;
        }
        if (this.signUp.userPwd.trim() === '') {
            errorCount++;
            this.validationError = true;
        }
        if (errorCount === 3) {
            this.combinedErrorMessage = true;
        }

        if (!this.signUp.isAgreeTerms || this.validationError) {
            this.toastr.warning('Please select terms & conditins.');
            return;
        }

        this.loaderService.show();
        try {
            const response = await this.loginService.saveSignUp(this.signUp);
            this.loaderService.hide();
            if (this.signUp.userContactNo && this.signUp.userContactNo.toString().length > 0 && !this.phoneError) {
                this.mobileDivEnabled = true;
            } else {
                this.emailDivEnabled = true;
            }
        } catch (e) {
            console.log('there was an error');
            console.log(e);
            this.loaderService.hide();
        }
    }

    async validatePhone() {
        try {
            this.loaderService.show();
            const response = await this.loginService.validatePhoneOtp(this.signUp.userContactNo, this.mobileOTP);
            this.closeModal.emit();
            const signUp: SignUp = response.data.Result;
            const obj = {
                Password: signUp.userPwd,
                UserName: signUp.userContactNo
            };
            this.commonService.notifyOther({ option: 'onCallLogin', value: obj });
            this.routeCall(true);
        } catch (e) {
            this.routeCall(false);
            console.log(e);
        }
    }

    routeCall(status) {
        this.router.navigate(['user-verify'],
            { queryParams: { mobile: this.signUp.userContactNo, mobileStatus: status } });
    }

    getTermsAndConditions() {
        this.termsAndConditionsModal.emit(true);
        // this.termsAndConditionsModal = true;
    }

    // termsAndConditionsPopupEvent(event) {
    //     this.termAndConditionmodal = false;
    // }
}
