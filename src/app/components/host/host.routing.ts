import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HostExperienceComponent } from './experience/experience.component';
import { UniqueHomeComponent } from './unique-home/unique-home.component';
import { HostBusinessComponent } from './business';
import { TaxiComponent } from './taxi/taxi.component';
import { HostThankYouComponent } from './shared';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'experience', component: HostExperienceComponent },
      { path: 'property', component: UniqueHomeComponent },
      { path: 'business', component: HostBusinessComponent },
      { path: 'taxi', component: TaxiComponent },
      { path: 'host-thank-you', component: HostThankYouComponent },
    ]
  }
];

export const HostRouting: ModuleWithProviders = RouterModule.forChild(routes);
