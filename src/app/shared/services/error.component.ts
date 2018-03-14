import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { ErrorModel } from './error.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html'
})

export class ErrorComponent implements OnInit, OnDestroy {

  public error: ErrorModel = new ErrorModel();
  private subscription: Subscription;
  constructor(private router: Router,
    private errorService: ErrorService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    {
      this.toastr.setRootViewContainerRef(vcr)
      this.subscription = this.errorService.getErrorMessage().subscribe(message => {
        this.error = message;
        if (this.error.isError) {
          this.error.errorMessages.forEach(item => {
            this.toastr.error(item.detail, item.severity);
          })

        }
      });
    }
  }

  ngOnInit() {
    this.subscription = this.errorService.errorState.subscribe((error: ErrorModel) => {
      this.error = error;
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
