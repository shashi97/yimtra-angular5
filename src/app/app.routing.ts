import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ContentComponent } from './core/content/content.component';

export const routes: Routes = [
  {
    path: '', component: ContentComponent,
    children: [
      { path: '', loadChildren: 'app/core/core.module#CoreModule' },
      { path: 'about', loadChildren: 'app/components/about/about.module#AboutModule' },
      { path: 'host', loadChildren: 'app/components/host/host.module#HostModule' },
      { path: 'media', loadChildren: 'app/components/media/media.module#MediaModule' },
      { path: 'book', loadChildren: 'app/components/book/book.module#BookModule' },
      { path: 'end-to-end-trip-planning', loadChildren: 'app/components/trip-planning/trip-planning.module#TripPlanningModule' }
    ]
  },
  { path: '**', redirectTo: 'miscellaneous/error404' }

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
