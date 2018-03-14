import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BookHomeCheckoutDetailModel } from '../shared/index';
import { LoaderService } from '../../../../../core/loader/loader.service';
import { BookService, ServiceSubCategoryModel } from '../../../shared';
import { ServiceCategoryEnum } from '../../../../../shared/enum/service-category-enum';
@Component({
  selector: 'app-guest-identity',
  templateUrl: './guest-identity.component.html'
})
export class BookGuestIdentityComponent implements OnInit {

  @Input() bookHomeCheckout: BookHomeCheckoutDetailModel;
  identityTypes: Array<ServiceSubCategoryModel> = [];

  constructor(private loaderService: LoaderService,
    private bookService: BookService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getIdentityTypes(ServiceCategoryEnum.Identity);
  }

  async getIdentityTypes(id) {
    try {
      this.loaderService.show();
      const response = await this.bookService.getServiceSubCategoryByServiceId(id);
      this.identityTypes = response.data.Result;
      this.loaderService.hide();
    } catch (e) {
      this.loaderService.hide();
    }
  }

  public generateFileData(fileInput: any) {
    const image = fileInput.target.files[0];
    const size = fileInput.target.files[0].size;
    this.bookHomeCheckout.attachment.fileName = image.name;
    const FR = new FileReader();
    FR.onload = (e: any) => {
      const type = fileInput.target.files[0].type.split('/')[1];
      if (type === 'png' || type === 'jpeg' || type === 'pdf' || type === 'jpg' || type === 'gif') {
        const fileBase64 = (e.target as any).result;
        this.bookHomeCheckout.attachment.attachmentDataBase64 = fileBase64;
      } else {
        this.toastr.warning('please use correct format of image');
      }
    };
    FR.readAsDataURL(fileInput.target.files[0]);
  }

  checkValidation(): boolean {
    if (this.bookHomeCheckout.bookStay.guestIdType === 0) {
      this.toastr.warning('Please select Id proof');
      return true;
    }

    if (!this.bookHomeCheckout.attachment.attachmentDataBase64 || this.bookHomeCheckout.attachment.attachmentDataBase64.trim() === '') {
      this.toastr.warning('Please attach document');
      return true;
    }
  }
}