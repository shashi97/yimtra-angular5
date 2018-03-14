import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FounderVisionComponent } from './founder-vision/founder-vision.component';
import { LiamtraInspirationComponent } from './liamtra-inspiration/liamtra-inspiration.component';
import { VirtualRealityTourComponent } from './virtual-reality-tour/virtual-reality-tour.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'founder-vision', component: FounderVisionComponent },
      { path: 'liamtra-inspiration', component: LiamtraInspirationComponent },
      { path: 'virtual-reality-tour', component: VirtualRealityTourComponent }
    ]
  }
];

export const MediaRouting: ModuleWithProviders = RouterModule.forChild(routes);
