
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FounderVisionComponent } from './founder-vision/founder-vision.component';
import { LiamtraInspirationComponent } from './liamtra-inspiration/liamtra-inspiration.component';
import { VirtualRealityTourComponent } from './virtual-reality-tour/virtual-reality-tour.component';
import { MediaRouting } from './media.routing';

@NgModule({
  declarations: [
    FounderVisionComponent,
    LiamtraInspirationComponent,
    VirtualRealityTourComponent
  ],
  imports: [
    SharedModule,
    MediaRouting
  ],
  exports: [
    SharedModule
  ]
})
export class MediaModule { }
