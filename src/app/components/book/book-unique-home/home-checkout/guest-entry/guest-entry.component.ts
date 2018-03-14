import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { BookHomeCheckoutDetailModel } from '../shared/index';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-guest-entry',
  templateUrl: './guest-entry.component.html'
})
export class BookGuestEntryComponent implements OnInit {

  isEmailInvalid: boolean = false;
  isError: boolean = false;
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phonenoPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  @Input() bookHomeCheckouts: BookHomeCheckoutDetailModel;

  constructor(private localStorageService: LocalStorageService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    let user = this.localStorageService.getCurrentUser().User
    this.bookHomeCheckouts.bookStay.guestName = user.UserName;
    this.bookHomeCheckouts.bookStay.emailId = user.UserEmail;
    this.bookHomeCheckouts.bookStay.contactNumber = user.UserContactNo;
  }

  checkValidation(type): boolean {
    this.isError = false;
    if (this.bookHomeCheckouts.bookStay.guestName.trim() === '') {
      if (type === 'name') {
        this.toastr.warning('Guest name field is mandatory');
      }
      this.isError = true;
      return true;
    }

    if ((this.bookHomeCheckouts.bookStay.emailId.trim() === '' ||
      !this.emailPattern.test(this.bookHomeCheckouts.bookStay.emailId))) {
      if (type === 'email') {
        this.toastr.warning('Please enter valid email-Id');
      }
      this.isError = true;
      return true;
    }

    if ((this.bookHomeCheckouts.bookStay.contactNumber.trim() === '' ||
      !this.phonenoPattern.test(this.bookHomeCheckouts.bookStay.contactNumber))) {
      if (type === 'number') {
        this.toastr.warning('Please enter valid Contact number');
      }
      this.isError = true;
      return true;
    }

    if (type === 'All' && this.isError) {
      this.toastr.warning('Please check the mandatory fields');
      return true;
    }
  }
}