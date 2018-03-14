
import { NgModule, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { FooterComponent } from './core/footer/footer.component';
import { ContentComponent } from './core/content/content.component';
import { SharedModule } from './components/shared/shared.module';
import { CoreModule } from './core/core.module';
import { HostModule } from './components/host/host.module';
import { MediaModule } from './components/media/media.module';
import { BookModule } from './components/book/book.module';
import { TripPlanningModule } from './components/trip-planning/trip-planning.module';
import { AboutModule } from './components/about/about.module';
import { LoaderComponent, LoaderService } from './core/loader';
import { PaginationService } from './shared/services/pagination.service';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import {
  CommonService,
  ErrorService,
  httpFactory,
  LocalStorageService
} from './shared/services';
import { MasterService } from './components/shared/service/master.service';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpModule,
    BrowserModule,
    AppRouting,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastModule.forRoot()
  ],
  providers: [
    PaginationService,
    CommonService,
    MasterService,
    LoaderService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Router, ErrorService, LocalStorageService, LoaderService]
    }
  ],
  exports: [
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(public appRef: ApplicationRef) { }
}
