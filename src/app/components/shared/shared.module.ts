
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LocationComponent } from './location/location.component';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { AttachmentImageComponent, AttachmentVideoComponent } from './attachment/index';
import { HomeDestinationComponent } from '../../core/home-destination/home-destination.component';
import { HomeExperienceComponent } from '../../core/home-experience/home-experience.component';
import { HomeDealComponent } from '../../core/home-deal/home-deal.component';
import { HomeTestimonialComponent } from '../../core/home-testimonial/home-testimonial.component';
import { HomeAboutComponent } from '../../core/home-about/home-about.component';
import { HeaderComponent } from '../../core/header/header.component';
import { LoginModalPopupComponent } from '../../core/login-modal-popup';
import { SignInComponent } from '../../core/login-modal-popup/sign-in/sign-in.component';
import { SignUpComponent } from '../../core/login-modal-popup/sign-up/sign-up.component';

import { FooterComponent } from '../../core/footer/footer.component';
import { Select2Module } from 'ng2-select2';

import { MapComponent } from '../shared/map/map.component';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { LoginService } from '../../core/login-modal-popup/shared';
import { OnlyAlphaNumeric, emailValidate, OnlyDecimalNumber } from '../../shared/directives';
import { MyDatePickerModule } from 'mydatepicker';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { BookUniqueHomeReportListing } from '../../core/dialog-component/book-unique-home-report/book-unique-home-report.component';
import {
  ErrorComponent
} from '../../shared/services/index';
import { ImageSlider } from './image-slider/image-slider.component';
import { printSlide } from './image-slider/print.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';


import { PaginatorComponent } from '../../shared/paginator/paginator.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('91735406996-div38oic1uqnjrba0k9an5j83oi1r629.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('150767659056394')
  }
]);

export function provideConfig() {
  return config;
}

import {
  ErrorService,
  httpFactory,
  LocalStorageService
} from '../../shared/services';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TermsAndConditionsComponent } from '../../core/terms-and-conditions/terms-and-conditions.component';
import { TruncatePipe } from './pipes/truncate';
import { ContactToHostComponent } from '../../core/contact-to-host/contact-to-host.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    ErrorComponent,
    LocationComponent,
    AttachmentImageComponent,
    AttachmentVideoComponent,
    HomeDestinationComponent,
    HomeExperienceComponent,
    HomeDealComponent,
    HomeTestimonialComponent,
    HomeAboutComponent,
    HeaderComponent,
    LoginModalPopupComponent,
    SignInComponent,
    SignUpComponent,
    FooterComponent,
    MapComponent,
    OnlyAlphaNumeric,
    emailValidate,
    OnlyDecimalNumber,
    BookUniqueHomeReportListing,
    ImageSlider,
    printSlide,
    TermsAndConditionsComponent,
    TruncatePipe,
    ContactToHostComponent
    

  ],
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    SocialLoginModule,
    NguiAutoCompleteModule,
    IonRangeSliderModule,
    MyDatePickerModule,
    AngularMultiSelectModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    Select2Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwk_2pf0FymbUFvk0XnJq7bsDZpOJgJuc',
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule,
  ],
  providers: [
    LoginService,
    ErrorService,
    LocalStorageService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  exports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PaginatorComponent,
    ErrorComponent,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    NguiAutoCompleteModule,
    IonRangeSliderModule,
    MyDatePickerModule,
    OnlyAlphaNumeric,
    emailValidate,
    OnlyDecimalNumber,
    MapComponent,
    AngularMultiSelectModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    LocationComponent,
    AttachmentImageComponent,
    AttachmentVideoComponent,
    HomeDestinationComponent,
    HomeExperienceComponent,
    HomeDealComponent,
    HomeTestimonialComponent,
    HomeAboutComponent,
    HeaderComponent,
    LoginModalPopupComponent,
    SignInComponent,
    SignUpComponent,
    FooterComponent,
    Select2Module,
    BookUniqueHomeReportListing,
    ImageSlider,
    printSlide,
    TermsAndConditionsComponent,
    TruncatePipe,
    ContactToHostComponent
  ],
  entryComponents: [
    BookUniqueHomeReportListing
  ]
})
export class SharedModule { }
