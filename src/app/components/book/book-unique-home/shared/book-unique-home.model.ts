export class BookUniqueHomeDetailModel {
    cleaningFee: number = 0;
    svcTypeId: number = 0;
    numberOfGuestsInRoom: number = 0;
    svcSCatgId: number = 0;
    svcCatgId: number = 0;
    language: string = "";
    svcId: number = 0;
    serviceFee: number = 0;
    occupancyTaxes: number = 0;
    accommodation: number = 0;
    cityId: number = 0;
    stayId: number = 0;
    ownerId:number = 0;
    ownerName:string= "";
    svcName: string = '';
    svcDesc: string = '';
    latitude: number = 0;
    longitude: number = 0;
    numberOfBathRooms: number = 0;
    numberOfBeds: number = 0;
    numberOfRooms: number = 0;
    roomPrice: number = 0;
    stayName: string = '';
    avgReviews: number = 0;
    totalReviews: number = 0;
    contactNo: string = '';
    hostCharges: Array<BookCharges> = [];
    allAttachments: Array<AllAttachments> = new Array<AllAttachments>();
    reviews: Array<Reviews> = new Array<Reviews>();
    serviceCategory: Array<ServiceCategory> = new Array<ServiceCategory>();
    serviceSubCategory: Array<ServiceSubCategory> = new Array<ServiceSubCategory>();
    images: Array<any> = [];
    videos: Array<any> = [];
}

export class FilterBookUniqueHomeModel {
    NumberOfRooms: number = 0;
    NumberOfBeds: number = 0;
    NumberOfBathRooms: number = 0;
    MaxRoomPrice: number;
    MinRoomPrice: number;
    SvcSCatgId: string = "";
    CityName: string = '';
    NumberofGuestsInRoom: number = 0;
    CheckIn: string = '';
    CheckOut: string = '';
    SortId:number = 0;
}

export class HostServiceLinkingSubCategories {
    svcId: number = 0;
    svcCatgId: number = 0;
    svcSCatgId: number = 0;
    isActive: boolean = false;
}

export class AllAttachments {
    attachmentId: number = 0;
    attachmentType: number = 0;
    fileName: string = '';
    genId: number = 0;
    svcTypeId: number = 0;
    remarks: string = '';
    attachmmentStatus: number = 0;
    isActive: boolean = false;
    attachmentDataBase64: string = '';
    attachmentData: string = '';
    attachmentUrl: string = '';
}

export class Reviews {
    reviewId: number = 0;
    reviewTypeId: number = 0;
    reviewRatingValue: number = 0;
    genId: number = 0;
    svcTypeId: number = 0;
    reviewRemarks: string = '';
    status: number = 0;
    isActive: boolean = false;
    userName: string = '';
    svcTypeName: string = '';
}

export class ServiceType {
    svcTypeId: number = 0;
    svcTypeCode: string = '';
    svcTypeName: string = '';
    isActive: boolean = false;
    userServiceRole: Array<any> = [];
}

export class ServiceCategory {
    svcCatgId: number = 0;
    svcCatgCode: string = '';
    svcCatgDesc: string = '';
    isActive: boolean = false;;
    serviceSubCategory: Array<ServiceSubCategory> = new Array<ServiceSubCategory>();
}

export class ServiceSubCategory {
    svcSCatgId: number = 0;
    svcSCatgCode: string = '';
    svcSCatgDesc: string = '';
    svcCatgId: number = 0;
    isActive: boolean = false;
    isDeleted: boolean = false;
}

export class HostStayDetail {
    stayId: number = 0;
    svcId: number = 0;
    listType: number = 0;
    propertyType: number = 0;
    stayName: string = '';
    svcTypeId: number = 0;
    numberOfRooms: number = 0;
    numberOfBeds: number = 0;
    numberOfBathRooms: number = 0;
    roomPrice: number = 0;
    cleaningFee: number = 0;
    numberOfGuestsInRoom: number = 0;
    bookingPreference: number = 0;
    checkInTime: string = '';
    checkOutTime: string = '';
    flexible: boolean = false;
    neighbourhood: string = '';
    experience: number = 0;
    ownerUserId: number = 0;
    stayStatus: number = 0;
    eMailId: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    isActive: boolean = false;
}

export class BookCharges {
    svcCatgId: number = 0;
    svcSCatgId: number = 0;
    amount: number = 0;
    svcSCatgDesc: string = '';
}

export class ReportListingModel {
    svcId: number = 0;
    listingRemarks: string = '';
}

export class ContactHost {
  ownerId:number = 0;
  comments:string = "";
} 
