
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TripPlanningComponent } from './trip-planning.component';
import { TripPlanningRouting } from './trip-planning.routing';

@NgModule({
  declarations: [
    TripPlanningComponent
  ],
  imports: [
    SharedModule,
    TripPlanningRouting
  ],
  exports: [
    SharedModule
  ]
})
export class TripPlanningModule { }
