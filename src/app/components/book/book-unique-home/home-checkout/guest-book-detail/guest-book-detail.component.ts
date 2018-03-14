import { Component, OnInit, Input } from '@angular/core';
import { BookingDetailsModel } from '../shared/index';

@Component({
  selector: 'app-guest-book-detail',
  templateUrl: './guest-book-detail.component.html'
})
export class BookGuestBookDetailComponent implements OnInit {
  @Input() bookingDetails: BookingDetailsModel;
  GSTPrice: number = 0;
  totalPriceAfterGST: number = 0;

  constructor() { }

  ngOnInit() {
    this.GSTPrice = this.bookingDetails.totalPrice * 18 / 100;
    this.GSTPrice = parseFloat(this.GSTPrice.toFixed(2))
    this.totalPriceAfterGST = this.GSTPrice + Number(this.bookingDetails.totalPrice);
  }
}