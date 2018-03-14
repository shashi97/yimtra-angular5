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
import { SignIn, SignUp, LoginService, Token, SocialModal } from './shared';
import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LoaderService } from '../loader/loader.service';
import { LoginEnum } from '../../shared/enum/login.enum';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../shared/services';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal-popup.component.html'
})

export class LoginModalPopupComponent implements OnInit {
  count: number = 0;
  @Input() modalStatus: string = '';
  @Input() modal: boolean = true;
  @Output() modalPopupEvent = new EventEmitter();
  user: SocialUser;
  loggedIn: boolean;
  token: Token = new Token();
  socialModal: SocialModal = new SocialModal();
  private subscription: Subscription;
  @Output() termsAndConditionsModal = new EventEmitter();
  agreementModal: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      // console.log('clicked inside');
    } else {
      // console.log('clicked ouside');
    }
  }

  constructor(private eRef: ElementRef,
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private router: Router,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'signInModal') {
        this.switchModal('signIn');
      }
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // console.log(JSON.stringify(this.user));
      // console.log('user token get from FB/google');
      if (this.user) {
        this.onSocialLogin();
      }
    });
  }

  onClickOutside(event) {
    // if (this.modal && this.count > 0
    //   && event.target.className !== "hide-password ng-star-inserted"
    //   && event.target.innerText !== "Ok"
    //   && event.target.nodeName !== "IMG") {
    //   this.count = 0;
    //   this.modal = false;
    //   this.modalPopupEvent.emit(this.modal);
    // }
    // if (this.modal) {
    //   this.count++;
    // }
  }

  closeModal(event) {
    this.modal = false;
    this.modalPopupEvent.emit(this.modal);
  }

  switchModal(status) {
    this.modalStatus = status;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // console.log('google');
  }

  async onSocialLogin() {
    this.loaderService.show();
    try {
      let obj: SignIn = {
        UserName: this.user.email,
        Password: '',
        AccessToken: this.user.authToken,
        provider: this.user.provider === 'FACEBOOK' ? LoginEnum.FacebookProvider : LoginEnum.GoogleProvider,
        rememberMe: false
      }
      const response = await this.loginService.saveSignIn(obj);
      this.token = response.data.Result;
      if (this.token && this.token.AccessToken) {
        this.localStorageService.setCurrentUser(this.token);
      }

      this.router.navigate(['']);
      this.loaderService.hide();
      this.modalPopupEvent.emit(false);
    } catch (e) {
      this.loaderService.hide();
      // console.log(e);
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    // console.log('fb');
  }

  signOut(): void {
    this.authService.signOut();
    this.localStorageService.removeLogin();
    this.user = null;
    this.modalPopupEvent.emit(this.modal);
  }

  termsAndConditionsPopupEvent(event) {
    this.agreementModal = event;
  }

}
