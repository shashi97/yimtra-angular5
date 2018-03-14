import { Component, OnInit, Input, Output, ViewContainerRef, EventEmitter } from '@angular/core';
import { AttachmentModel } from '../../attachment.model';
import { HostModel } from '../../../host/shared/host.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AttachmentType } from '../../../../shared/enum/cms-sytem-enum';

@Component({
  selector: 'app-attachment-image',
  templateUrl: './image.component.html'
})

export class AttachmentImageComponent implements OnInit {

  @Input() hostModel: HostModel;
  fileName: String;
  FileList = [];
  // attachmentSrc: String;
  constructor(
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onAttachemnt() { }

  async imageUploadEvent(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const type = fileList[i].type.split('/')[1];
        if (type === 'png' || type === 'jpeg' || type === 'jpg' || type === 'gif') {
          const fileToLoad = fileList[i];
          await this.generateFileData(fileToLoad);
        } else {
          this.toastr.warning('Please use correct format of image');
        }
      }
    }
  }

  deleteAttachment($index) {
    console.log('ss');
    this.hostModel.allAttachments.splice($index, 1);
    this.FileList.splice($index, 1);
  }

  async generateFileData(fileToLoad) {
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent: any) => {
      const base64Code = fileLoadedEvent.target.result;
      const fileUploadModel = new AttachmentModel();
      fileUploadModel.attachmentType = AttachmentType.Image;
      fileUploadModel.fileName = fileToLoad.name;
      fileUploadModel.attachmentDataBase64 = base64Code;
      this.hostModel.allAttachments.push(fileUploadModel);
      this.FileList.splice(this.FileList.length, -1, { fileUploadModel });
    };
    fileReader.readAsDataURL(fileToLoad);
  }

}
