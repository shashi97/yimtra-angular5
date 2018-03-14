
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ViderSliderComponent } from './video-slider/video-slider.component';
import { SharedModule } from '../components/shared/shared.module';
import { CoreRouting } from './core.routing';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { CoreService } from './shared';



@NgModule({
  declarations: [
    ViderSliderComponent,
    HomeComponent,
    UserVerificationComponent
  ],
  imports: [
    SharedModule,
    CoreRouting
  ],
  providers: [
    CoreService
  ],
  exports: [
    SharedModule
  ]
})
export class CoreModule { }
