import { Component, OnInit, Input, Output, ViewContainerRef, EventEmitter } from '@angular/core';
import { AttachmentModel } from '../../attachment.model';
import { HostModel } from '../../../host/shared/host.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AttachmentType } from '../../../../shared/enum/cms-sytem-enum';

@Component({
  selector: 'app-attachment-video',
  templateUrl: './video.component.html'
})


export class AttachmentVideoComponent implements OnInit {

  @Input() hostModel: HostModel;
  fileName: string = '';
  FileList = [];
  // attachmentSrc: String;

  constructor(
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() { }

  async videoUploadEvent(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const size = fileList[i].size;
        if (size > 2600000) {
          this.toastr.warning('Please upload less than or equal to 2.50mb videos only');
          return;
        }
        const type = fileList[i].type.split('/')[1];
        if (type === 'mp4' || type === 'avi' || type === 'WMV' || type === '3gpp') {
          const fileToLoad = fileList[i];
          await this.generateFileData(fileToLoad);
        } else {
          this.toastr.warning('Please use correct format of image');
        }
      }
    }
  }

  deleteAttachment($index) {
    this.hostModel.allAttachments.splice($index, 1);
    this.FileList.splice($index, 1);
    // this.attachmentSrc = '';
  }

  // showAttachment(data) {
  //   this.attachmentSrc = data.fileUploadModel.attachmentDataBase64;
  // }

  async generateFileData(fileToLoad) {
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent: any) => {
      const base64Code = fileLoadedEvent.target.result;
      const fileUploadModel = new AttachmentModel();
      fileUploadModel.attachmentType = AttachmentType.Video;
      fileUploadModel.fileName = fileToLoad.name;
      fileUploadModel.attachmentDataBase64 = base64Code;
      this.hostModel.allAttachments.push(fileUploadModel);
      // this.attachmentSrc = fileUploadModel.attachmentDataBase64;
      this.FileList.splice(this.FileList.length, -1, { fileUploadModel });
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}
