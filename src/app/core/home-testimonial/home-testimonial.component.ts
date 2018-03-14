import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CMSModel } from '../shared';
import { ApiUrl } from '../../api.service';

@Component({
  selector: 'app-home-testimonial',
  templateUrl: './home-testimonial.component.html'
})
export class HomeTestimonialComponent implements OnInit, OnChanges {
  @Input() div: CMSModel;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.div.review.length > 0) {
      // console.log('test');
    }
  }

}
