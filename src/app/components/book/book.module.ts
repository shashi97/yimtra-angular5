
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BookExperienceComponent, BookExperienceDetailComponent } from './book-experience';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { BookHotalComponent } from './book-hotal/book-hotal.component';
import {
  BookTaxiComponent,
  BookTaxiSearchComponent,
  BookTaxiDetailComponent,
  BookTaxiFilterComponent,
  BookTaxiService
} from './book-taxi/index';
import { BookTourComponent } from './book-tour/book-tour.component';
import { BookUberComponent } from './book-uber/book-uber.component';
import { CoreService } from '../../core/shared';
import {
  BookUniqueHomeDetailComponent,
  BookUniqueHomeComponent,
  BookUniqueHomeSearchComponent,
  BookUniqueHomeService,
  BookHomeCheckoutComponent,
  BookGuestIdentityComponent,
  BookGuestEntryComponent,
  BookGuestBookDetailComponent,
  BookHomeCheckoutService,
  BookThankYouComponent
} from './book-unique-home/index';
import {
  BookUniqueSearchFilterComponent
} from './book-unique-search-filter/book-unique-search-filter.component';
import { BookVendorComponent } from './book-vendor/book-vendor.component';
import { BookRouting } from './book.routing';
import { BookService } from '../book/shared';
import { RatingModule } from 'ng2-rating';
import { BookTourSearchComponent, BookTourSearchFilterComponent, BookTourService } from './book-tour/index';
import { BookExperienceSearchFilterComponent } from './book-experience/search-filter/search-filter.component';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({

  declarations: [
    BookExperienceSearchFilterComponent,
    BookExperienceComponent,
    BookExperienceDetailComponent,
    BookFlightComponent,
    BookHotalComponent,
    BookTaxiComponent,
    BookTourComponent,
    BookUberComponent,
    BookUniqueHomeComponent,
    BookUniqueHomeSearchComponent,
    BookVendorComponent,
    BookUniqueSearchFilterComponent,
    BookUniqueHomeDetailComponent,
    BookHomeCheckoutComponent,
    BookGuestIdentityComponent,
    BookGuestEntryComponent,
    BookGuestBookDetailComponent,
    BookThankYouComponent,
    BookTaxiSearchComponent,
    BookTaxiDetailComponent,
    BookTourSearchFilterComponent,
    BookTourSearchComponent,
    BookTaxiFilterComponent
  ],
  imports: [
    SharedModule,
    BookRouting,
    RatingModule,
    // BrowserAnimationsModule,
  ],
  providers: [
    BookService,
    BookUniqueHomeService,
    BookHomeCheckoutService,
    CoreService,
    BookTourService,
    BookTaxiService
  ],
  exports: [
    SharedModule
  ]
})
export class BookModule { }
