import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TripPlanningComponent } from './trip-planning.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TripPlanningComponent }
    ]
  }
];

export const TripPlanningRouting: ModuleWithProviders = RouterModule.forChild(routes);
