import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BookExperienceComponent, BookExperienceDetailComponent } from './book-experience';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { BookHotalComponent } from './book-hotal/book-hotal.component';
import {
  BookTaxiComponent,
  BookTaxiSearchComponent,
  BookTaxiDetailComponent
} from './book-taxi/index';
import { BookTourComponent, BookTourSearchFilterComponent } from './book-tour/index';
import { BookUberComponent } from './book-uber/book-uber.component';
import {
  BookUniqueHomeComponent,
  BookUniqueHomeDetailComponent,
  BookUniqueHomeSearchComponent,
  BookHomeCheckoutComponent,
  BookThankYouComponent
} from './book-unique-home/index';
import { BookVendorComponent } from './book-vendor/book-vendor.component';
import { BookTourSearchComponent } from './book-tour/tour-search/tour-search.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'experience', component: BookExperienceComponent },
      { path: 'experience-detail', component: BookExperienceDetailComponent },
      { path: 'flight', component: BookFlightComponent },
      { path: 'hotel', component: BookHotalComponent },
      { path: 'car', component: BookTaxiComponent },
      { path: 'car-search', component: BookTaxiSearchComponent },
      { path: 'car-detail', component: BookTaxiDetailComponent },
      { path: 'car', component: BookTaxiComponent },
      { path: 'tour', component: BookTourComponent },
      { path: 'uber', component: BookUberComponent },
      { path: 'unique-homes', component: BookUniqueHomeComponent },
      { path: 'unique-homes-search', component: BookUniqueHomeSearchComponent },
      { path: 'unique-homes-detail', component: BookUniqueHomeDetailComponent },
      { path: 'vendor', component: BookVendorComponent },
      { path: 'unique-home-checkout', component: BookHomeCheckoutComponent },
      { path: 'unique-home-thank-you', component: BookThankYouComponent },
      { path: 'tour-search', component: BookTourSearchComponent }
    ]
  }
];

export const BookRouting: ModuleWithProviders = RouterModule.forChild(routes);
