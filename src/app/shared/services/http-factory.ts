import { Router } from '@angular/router';
import { HttpModule, XHRBackend, Http, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './http-interceptor.service';
import { LocalStorageService } from './local-storage.service';
import { LoaderService } from '../../core/loader'
import { ErrorService } from './error.service';

export function httpFactory(xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  router: Router,
  errorService: ErrorService,
  localStorageService: LocalStorageService,
  loaderService: LoaderService): Http {
  return new HttpInterceptor(xhrBackend, requestOptions, router, errorService, localStorageService, loaderService);
}
