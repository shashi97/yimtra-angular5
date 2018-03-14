import { Component, OnInit, EventEmitter, Output, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';
import { LoaderService } from '../../../../core/loader/loader.service';
import { TaxiFilterModel } from '../shared/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ApiUrl } from '../../../../api.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-book-taxi-filter',
  templateUrl: './taxi-search-filter.component.html'
})

export class BookTaxiFilterComponent implements OnInit {
  taxiFilterModel: TaxiFilterModel = new TaxiFilterModel();
  @Output() setSearchdata = new EventEmitter();
  checkInDate;
  checkOutDate;
  todayDate;
  tomorrowDate;
  cities = [];

  constructor(private router: Router,
    public http: Http,
    public route: ActivatedRoute,
    private loaderService: LoaderService) {
  }


  ngOnInit() {
    this.taxiFilterModel.FromRoute = this.route.snapshot.queryParams['FromRoute'] || 'Korba';
    this.taxiFilterModel.ToRoute =  this.route.snapshot.queryParams['ToRoute'] || 'Shahjahanpur';
    // this.bookUnique.CityName = this.route.snapshot.queryParams['CityName'] || 'Patna';
    // this.bookUnique.NumberofGuestsInRoom = this.route.snapshot.queryParams['NumberofGuestsInRoom'] || '2';
    // this.bookUnique.CheckOut = this.route.snapshot.queryParams['CheckOut'] || this.tomorrowDate;
    // this.bookUnique.CheckOut = new Date(this.bookUnique.CheckOut);
    // this.getTotalGuests(ServiceCategoryEnum.TotalAdultGuest);
  }

  async getBookTaxiIndividual() {
    this.router.navigate(['book/car-search'], {
      queryParams: {
        FromRoute: this.taxiFilterModel.FromRoute,
        ToRoute: this.taxiFilterModel.ToRoute
      }
    });
  }


  observableSource = (keyword: any): Observable<any[]> => {
    const url = ApiUrl.MASTER_URI + 'City/listForDestinationSearch/' + keyword;
    if (keyword) {
      return this.http.get(url)
        .map(res => {
          const json = res.json();
          this.loaderService.hide();
          return json;
        });
    } else {
      return Observable.of([]);
    }
  }
  observableSources = (keyword: any): Observable<any[]> => {
    const url = ApiUrl.MASTER_URI + 'City/listForDestinationSearch/' + keyword;
    if (keyword) {
      return this.http.get(url)
        .map(res => {
          const json = res.json();
          this.loaderService.hide();
          return json;
        });
    } else {
      return Observable.of([]);
    }
  }
}
