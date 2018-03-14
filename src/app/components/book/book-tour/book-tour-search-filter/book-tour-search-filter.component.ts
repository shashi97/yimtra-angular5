import { Component, OnInit, EventEmitter, Output, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { BookService, BookUnique, ServiceSubCategoryModel } from '../../shared';
import { ServiceCategoryEnum } from '../../../../shared/enum/service-category-enum';
import { CityModel } from '../../../shared/city.model';
 import { LoaderService } from '../../../../core/loader/loader.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ApiUrl } from '../../../../api.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {BookTourFilterModel} from '../index';
import { CustomDDO } from '../../../shared/custom-ddo.model';
import { MasterService } from '../../../shared/service/master.service';
@Component({
  selector: 'app-book-tour-search-filter',
  templateUrl: './book-tour-search-filter.component.html'
})

export class BookTourSearchFilterComponent implements OnInit {
  
  bookTourFilterModel: BookTourFilterModel = new BookTourFilterModel();
  months:Array<CustomDDO>   = new Array<CustomDDO>();
  constructor(private router: Router,
    public http: Http,
    public route: ActivatedRoute,
    private loaderService: LoaderService,
    private bookService: BookService,
    private masterService:MasterService) {
    const todayDate = new Date();
    const datePipe = new DatePipe('en-US');
  }


  ngOnInit() {
    // this.bookUnique.CheckIn = this.route.snapshot.queryParams['CheckIn'] || this.todayDate;
    // this.bookUnique.CheckIn = new Date(this.bookUnique.CheckIn);
    // this.bookUnique.CityName = this.route.snapshot.queryParams['CityName'] || 'Patna';
    // this.bookUnique.NumberofGuestsInRoom = this.route.snapshot.queryParams['NumberofGuestsInRoom'] || '2';
    // this.bookUnique.CheckOut = this.route.snapshot.queryParams['CheckOut'] || this.tomorrowDate;
    // this.bookUnique.CheckOut = new Date(this.bookUnique.CheckOut);
    // this.getTotalGuests(ServiceCategoryEnum.TotalAdultGuest);
    this.getMonths();
  }

  valueChanged(newVal) {
    // console.log('Case 2: value is changed to ', newVal);
  }

  async getBookTours() {
    this.router.navigate(['book/tour-search'], {
      queryParams: {
     
      }
    });
    // this.setSearchdata.emit()
    
    ;

  }
   getMonths() {
     const response =  this.masterService.getMonths();
     this.months = response;  
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
}
