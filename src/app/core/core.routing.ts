import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'user-verify', component: UserVerificationComponent }
    ]
  }
];

export const CoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
