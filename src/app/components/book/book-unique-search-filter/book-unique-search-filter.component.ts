import { Component, OnInit, EventEmitter,ViewContainerRef, Output, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { BookService, BookUnique, ServiceSubCategoryModel } from '../shared';
import { ServiceCategoryEnum } from '../../../shared/enum/service-category-enum';
import { CityModel } from '../../shared/city.model';
import { LoaderService } from '../../../core/loader/loader.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ApiUrl } from '../../../api.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-book-unique-search-filter',
  templateUrl: './book-unique-search-filter.component.html'
})

export class BookUniqueSearchFilterComponent implements OnInit {
  totalGuests: Array<ServiceSubCategoryModel> = [];
  bookUnique: BookUnique = new BookUnique();
  @Output() setSearchdata = new EventEmitter();
  checkInDate;
  checkOutDate;
  todayDate;
  tomorrowDate;
  cities = [];
  minDateForDatepicker;
  constructor(private router: Router,
    public http: Http,
    public route: ActivatedRoute,
    private loaderService: LoaderService,
  
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private bookService: BookService) {
    const todayDate = new Date();
    const datePipe = new DatePipe('en-US');
    this.todayDate = datePipe.transform(todayDate, 'MM-dd-yyyy');
    this.tomorrowDate = new Date();
    this.minDateForDatepicker = new Date(todayDate);
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
    this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {
    this.bookUnique.CheckIn = this.route.snapshot.queryParams['CheckIn'] || this.todayDate;
    this.bookUnique.CheckIn = new Date(this.bookUnique.CheckIn);
    this.bookUnique.CityName = this.route.snapshot.queryParams['CityName'] || '';
    this.bookUnique.NumberofGuestsInRoom = this.route.snapshot.queryParams['NumberofGuestsInRoom'] || '2';
    this.bookUnique.CheckOut = this.route.snapshot.queryParams['CheckOut'] || this.tomorrowDate;
    this.bookUnique.CheckOut = new Date(this.bookUnique.CheckOut);
    this.getTotalGuests(ServiceCategoryEnum.TotalAdultGuest);
  }

  valueChanged(newVal) {
    // console.log('Case 2: value is changed to ', newVal);
  }

  async getBookIndividual() {
    if(!this.bookUnique.CityName) {
      this.toastr.warning('Enter a valid City Name');
      return;
    }
    this.router.navigate(['book/unique-homes-search'], {
      queryParams: {
        CityName: this.bookUnique.CityName,
        NumberofGuestsInRoom: this.bookUnique.NumberofGuestsInRoom, CheckIn: this.bookUnique.CheckIn,
        CheckOut: this.bookUnique.CheckOut
      }
    });
    // this.setSearchdata.emit();

  }
  async getTotalGuests(id) {
    // try {
    // this.loaderService.show();
    const response = await this.bookService.getServiceSubCategoryByServiceId(id);
    this.totalGuests = response.data.Result;
    // this.loaderService.hide();    
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
