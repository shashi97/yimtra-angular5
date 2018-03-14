
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {
  HostExperienceComponent,
  HostExperienceDescriptionComponent,
} from './experience';
import { UniqueHomeComponent } from './unique-home/unique-home.component';
import { DetailComponent, HostThankYouComponent } from './shared';
import { ListingComponent } from './unique-home/listing/listing.component';
import { HighlightsComponent } from './unique-home/highlights/highlights.component';
import {
  HostBusinessComponent,
  HostBusinessVendorDescriptionComponent
} from './business';
import { TaxiComponent, VehicleVendorDetailComponent } from './taxi';
import { HostRouting } from './host.routing';
import { HostService } from './shared/host.service';

@NgModule({
  declarations: [
    HostExperienceComponent,
    HostExperienceDescriptionComponent,
    UniqueHomeComponent,
    DetailComponent,
    HostThankYouComponent,
    ListingComponent,
    HighlightsComponent,
    HostBusinessComponent,
    HostBusinessVendorDescriptionComponent,
    TaxiComponent,
    VehicleVendorDetailComponent
  ],
  imports: [
    SharedModule,
    HostRouting

  ],
  providers: [
    HostService,
  ],
  exports: [
    SharedModule

  ]
})
export class HostModule { }
