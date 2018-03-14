import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../../shared/services';
import { BookService } from '../shared';
import { LoaderService } from '../../../core/loader/loader.service';
import { ApiUrl } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-experience',
  templateUrl: './book-experience.component.html'
})

export class BookExperienceComponent implements OnInit {
  experiences: Array<any> = [];
  total = 0;
  page = 1;
  limit = 5;
  sliderCss: string = 'bookExperienceSearch';

  constructor(private paginationService: PaginationService,
    private loaderService: LoaderService,
    public router: Router,
    private bookService: BookService) {

  }

  ngOnInit() {
    let obj = {
      SvcId: 0,
      Experience: 'Local Culture',
      CityName: 'Visakhapatnam'
    };
    this.onFilterSearch(obj);
  }

  async getBookIndividual() {
    try {
      this.loaderService.show();
      const response = await this.bookService.getBookIndividual(this.paginationService.getParams());
      console.log(response.data.Result);
      this.loaderService.hide();
    } catch (e) {
      console.log(e + 'here is the error');
      this.loaderService.hide();
    }
  }

  async onFilterSearch(item) {
    this.paginationService.setFilterValues(item);
    try {
      this.loaderService.show();
      let response = await this.bookService.geExperiencetWithFilters(this.paginationService.getParams());
      this.experiences = response.data.Result.data;
      this.total = response.data.Result.totalRecords;
      this.experiences.forEach(element => {
        element.images = [];
        element.allAttachments.forEach(attachment => {
          let obj = {
            imgSrc: ApiUrl.SRC_URI + attachment.attachmentUrl,
            sType: 'img'
          }
          element.images.splice(element.images.length, 0, obj);
        });
      });
      console.log(response)
      this.loaderService.hide();
    } catch (e) {
      this.loaderService.hide();
    }

  }

  goToPage(n: number): void {
    this.page = n;
    let obj = {
      page: this.page,
      rows: this.limit
    }
    this.paginationService.setPageChange(obj);
    this.getBookIndividual();
  }

  onNext(): void {
    this.page++;
    this.getBookIndividual();
  }

  onPrev(): void {
    this.page--;
    this.getBookIndividual();
  }

  routeToDetail(expId) {
    this.router.navigate(['book/experience-detail'], {
      queryParams: {
        SvcId: expId,
        Experience: '',
        CityName: ''
      }
    });
  }


}
