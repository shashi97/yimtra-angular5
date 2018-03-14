
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LiamtraFoundationComponent } from './liamtra-foundation/liamtra-foundation.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { BlogComponent } from './blog/blog.component';
import { LeadershipTeamComponent } from './leadership-team/leadership-team.component';
import { AboutRouting } from './about.routing';

@NgModule({
  declarations: [
    LiamtraFoundationComponent,
    TestimonialComponent,
    BlogComponent,
    LeadershipTeamComponent
  ],
  imports: [
    SharedModule,
    AboutRouting
  ],
  exports: [
    SharedModule
  ]
})
export class AboutModule { }
