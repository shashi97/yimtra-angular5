import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LiamtraFoundationComponent } from './liamtra-foundation/liamtra-foundation.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { BlogComponent } from './blog/blog.component';
import { LeadershipTeamComponent } from './leadership-team/leadership-team.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'liamtra-foundation', component: LiamtraFoundationComponent },
      { path: 'testimonials', component: TestimonialComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'leadership-team', component: LeadershipTeamComponent }
    ]
  }
];

export const AboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
