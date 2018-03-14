import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-book-experience-detail',
    templateUrl: './experience-detail.component.html'
})

export class BookExperienceDetailComponent implements OnInit {
    experience: any;
    constructor(private loaderService: LoaderService,
        private router: Router,
        public route: ActivatedRoute,
        private bookService: BookService) {

    }

    ngOnInit() {
        this.route.queryParams.subscribe((param) => {
            this.experience.SvcId = param['SvcId'];
            this.experience.Experience = param['Experience'];
            this.experience.CityName = param['CityName'];
            this.getBookExperienceIndividual();
        });
    }

    async getBookExperienceIndividual() {
        try {
            this.loaderService.show();
            const response = await this.bookService.geExperiencetById(this.experience);
            this.experience = response.data.Result;
            this.loaderService.hide();
        }
        catch (e) {
            this.loaderService.hide();
        }
    }

}
