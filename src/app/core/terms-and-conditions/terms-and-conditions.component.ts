import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LoaderService } from '../loader/loader.service';
import { LoginEnum } from '../../shared/enum/login.enum';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../shared/services';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html'
})

export class TermsAndConditionsComponent implements OnInit {
  private subscription: Subscription;
  count: number = 0;
  @Output() modalPopupEvent = new EventEmitter();
  @Input() modal: boolean = true;
  constructor(private eRef: ElementRef,
    private localStorageService: LocalStorageService,
    private router: Router,
    private commonService: CommonService,
    private loaderService: LoaderService,
  ) {
  }

  ngOnInit() {

  }

  closeModal () {
    this.modal = false;
    this.modalPopupEvent.emit(false);
  }

//   onClickOutside(event) {
//     if (this.modal && this.count === 1) {
//         this.count = 0;
//         this.modal = false;
//         this.modalPopupEvent.emit(this.modal);
//     }
//     if (this.modal) {
//         this.count++;
//     }
// }


}
