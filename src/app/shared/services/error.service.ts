import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ErrorModel } from './error.model';

@Injectable()
export class ErrorService {

  private errorSubject = new Subject<ErrorModel>();

  errorState = this.errorSubject.asObservable();

  sendErrorMessage(message: ErrorModel) {
    this.errorSubject.next({
      isError: message.isError,
      errorMessages: message.errorMessages
    });
  }

  clearErrorMessage() {
    this.errorSubject.next();
  }

  getErrorMessage(): Observable<ErrorModel> {
    return this.errorSubject.asObservable();
  }
}
