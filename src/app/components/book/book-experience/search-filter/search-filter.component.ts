import { Component, OnInit, EventEmitter, Output, Pipe, PipeTransform } from '@angular/core';
import { BookService, ServiceSubCategoryModel } from '../../shared';
import { LoaderService } from '../../../../core/loader/loader.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ApiUrl } from '../../../../api.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'app-book-experience-search-filter',
    templateUrl: './search-filter.component.html'
})

export class BookExperienceSearchFilterComponent implements OnInit {

    @Output() setSearchdata = new EventEmitter();
    city: string = 'Patna';
    experience: string = 'Local Culture';

    constructor(public http: Http,
        private loaderService: LoaderService,
        private bookService: BookService) {
    }


    ngOnInit() { }

    async getBookExperience() {
        let obj = {
            SvcId: 0,
            Experience: this.experience,
            CityName: this.city
        };
        this.setSearchdata.emit(obj);
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

    experienceObservableSource = (keyword: any): Observable<any[]> => {
        const url = ApiUrl.MASTER_URI + 'ServiceSubCategory/get/' + keyword;
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
