import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ErrorService } from './error.service';
import { ErrorModel } from '../models/error.model';
import { LocalStorageService } from './local-storage.service';
import { LoaderService } from '../../core/loader';

@Injectable()
export class HttpInterceptor extends Http {
  error: ErrorModel = new ErrorModel();
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private router: Router,
    private errorService: ErrorService,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
  }


  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');

    let access_token = this.localStorageService.getAccessToken();
    if (access_token !== '') {
      options.headers.append('authorization', access_token);
    }

    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    // this.loaderService.show();

    return observable.catch((err, source) => {
      this.error.isError = true;
      this.error.errorMessages = [];
      let errorMessage = null;
      if (err.status === 401) {
        let user = this.localStorageService.getCurrentUser();                   // UnOthorised Access
        if (user) {
          this.localStorageService.removeLogin();
          errorMessage = 'Unauthorized user';
        }
      } else if (err.status === 0) {                // Api Connection Refused
        errorMessage = 'Server down!';
      } else if (err.status === 404) {              // API path not found
        errorMessage = '404 (Path not found!)';
      } else if (err.status === 400) {              // Bad Request
        errorMessage = err._body;
      } else if (err.status === 500) {  // Internal Server error
        errorMessage = err._body;
      }

      this.showErrorMessage(errorMessage);
      return Observable.throw(err);
    })
      .finally(() => {
        //   let timer = Observable.timer(1000);
        // timer.subscribe(t => {
        // this.loaderService.hide();
        // });
      });
  }

  private showErrorMessage(errorMessage) {
    this.error.errorMessages.push({ severity: 'Oops!', summary: '', detail: errorMessage });
    this.errorService.sendErrorMessage(this.error);
  }
}
