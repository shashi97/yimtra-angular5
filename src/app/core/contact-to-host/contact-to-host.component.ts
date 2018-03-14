import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewContainerRef
} from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LoaderService } from '../loader/loader.service';
import { LoginEnum } from '../../shared/enum/login.enum';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../shared/services';
import { BookUniqueHomeService, ContactHost } from '../../components/book/book-unique-home';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-contact-to-host',
  templateUrl: './contact-to-host.component.html'
})

export class ContactToHostComponent implements OnInit {
  private subscription: Subscription;
  count: number = 0;
  @Output() contactToHostmodalPopupEvent = new EventEmitter();
  @Input() modal: boolean = true;
  @Input() ownerId: number = 0;
  contactHost: ContactHost = new ContactHost();
  constructor(private eRef: ElementRef,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private bookUniqueHomeService: BookUniqueHomeService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private commonService: CommonService,
    private loaderService: LoaderService,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    

  }

  closeModal() {
    this.modal = false;
    this.contactToHostmodalPopupEvent.emit(this.modal);
  }

  async sendContactHostMessage() {
    try {
      this.contactHost.ownerId = this.ownerId;
      if(!this.contactHost.comments) {
        this.toastr.warning('Message field is required.');
        return;
      }
      let sendContactHostMessage = await this.bookUniqueHomeService.sendContactHostMessage(this.contactHost);
      console.log(sendContactHostMessage);
      this.modal = false;
      this.toastr.warning('Message successfully sent to host.');
    } catch { }
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
