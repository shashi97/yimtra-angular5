export class TaxiFilterModel {
  FromRoute: string = "";
  ToRoute: string = "";
  SvcId :number = 0;
  VehicleType:string = "";
}

export class TaxiDetailModel {
    svcId: number = 0;
    svcName:string = "";
    svcDesc:string = "";
    svcSCatgId:number = 0;
    svcCatgId:number = 0;
    contactNo:string = "";
    ownerId:number = 0;
    serviceTax: number =0;
    occupancyTax: number =0;
    avgReviews:number = 0;
    totalReviews:number = 0;
    vehicleType:number = 0;
    address1:string = "";
    address2:string = "";
    landmark:string = "";
    zipCode:number = 0;
    eMailId:string = "";
    longitude:number = 0;
    latitude:number = 0;
    remarks1:string = "";
    remarks2:string = "";
    remarks3:string = "";
    remarks4:string = "";
    ownerFirstName:string = "";
    ownerMiddleName:string = "";
    ownerLastName:string = "";
    ownerName: string = "";
    allAttachments: Array<AllAttachments> = [];  
    reviews: Array<any> = [];
    hostVehicleRate: Array<HostVehicleRate> = []; 
    hostVehicleRoute: Array<any> = [];
    images: Array<any> = [];
}

export class AllAttachments {
  attachmentId: 247;
  attachmentType: 2;
  fileName: string ="IMG_20171008_110351.jpg";
  genId: 147;
  svcTypeId: 3;
  remarks:string = "test";
  attachmmentStatus: 0;
  modifiedBy: 1;
  modificationDate:string = "2018-02-23T15:26:48";
  createdBy: 1;
  creationDate:string = "2018-02-23T15:26:48";
  isActive: true;
  attachmentDataBase64:string = null;
  attachmentData:string = null;
  attachmentUrl:string = "attachments/IMG_20171008_110351.jpg";
  isDefault: false;
  isDeleted: false;
  cmsUrl: null;
  objectURL: null;
  isTouched: false
}

export class HostVehicleRate { 
  rateId:number = 0;
  svcId:number = 0;
  vehicleType:number = 0;
  rate:number = 0;
  rateUOM:number = 0
  createdBy: 1;
  creationDate: string ="2018-02-23T15:26:36";
  modifiedBy: 1;
  modificationDate:string = "2018-02-23T15:26:36";
  isActive: true
}