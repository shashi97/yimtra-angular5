import { Data } from "@agm/core/services/google-maps-types";

export class BookUnique {
    svcId: number = 0;
    CityName: string = '';
    NumberofGuestsInRoom: number = 0;
    CheckIn: any;
    CheckOut: any;
}

export class BookUniqueHomeSearchData {
    allAttachments: Array<AllAttachments> = []
    checkInTime: string;
    checkOutTime: string;
    cityId: number;
    contactNo: string;
    hostServiceLinkingSubCategories = [];
    hostStayDetail: HostStayDetail = new HostStayDetail();
    latitude: number;
    longitude: number;
    numberOfBeds: number;
    numberOfRooms: number;
    reviews: Array<Review> = [];
    serviceCategory: ServiceCategoryModel = new ServiceCategoryModel();
    serviceSubCategory: Array<ServiceSubCategoryModel> = [];
    serviceType: ServiceTypeModel = new ServiceTypeModel();
    stayName: string;
    svcTypeCode: string;
    svcTypeName: string;
    svcCatgId: number;
    svcId: number;
    svcSCatgId: number;
    svcTypeId: number;
    images: Array<any> = []
    videos: Array<any> = [];
}


export class AllAttachments {
    attachmentData: string;
    attachmentDataBase64: string;
    attachmentUrl: string;
    creationDate: string;
    fileName: string;
    modificationDate: string;
    remarks: string;
    attachmentId: number;
    attachmentType: number;
    attachmmentStatus: number;
    createdBy: number;
    genId: number;
    modifiedBy: number;
    svcTypeId: number;
    isActive: boolean;
}

export class HostStayDetail {
    checkInTime: string;
    checkOutTime: string;
    creationDate: string;
    eMailId: string;
    modificationDate: string;
    modifiedBy: string;
    neighbourhood: string;
    stayName: string;
    bookingPreference: number;
    cleaningFee: number;
    createdBy: number;
    experience: number;
    latitude: number;
    listType: number;
    longitude: number;
    numberOfBathRooms: number;
    numberOfBeds: number;
    numberOfGuestsInRoom: number;
    numberOfRooms: number;
    ownerUserId: number;
    propertyType: number;
    roomPrice: number;
    stayId: number;
    stayStatus: number;
    svcId: number;
    svcTypeId: number;
    flexible: boolean;
    isActive: boolean;
}

export class Review {
    creationDate: string;
    modificationDate: string;
    modifiedBy: string;
    reviewRemarks: string;
    svcTypeName: string;
    userName: string;
    createdBy: number;
    genId: number;
    reviewId: number;
    reviewRatingValue: number;
    reviewTypeId: number;
    status: number;
    svcTypeId: number;
    isActive: boolean;
}

export class ServiceCategoryModel {
    svcCatgId: number = 0;
    svcCatgCode: string = '';
    svcCatgDesc: string = '';
    isActive: boolean = false;
    serviceSubCategory: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
}

export class ServiceSubCategoryModel {
    svcSCatgId: number = 0;
    svcSCatgCode: string = '';
    svcSCatgDesc: string = '';
    svcCatgId: number = 0;
    isDeleted: boolean = false;
    isEdit: boolean = false;
    isChecked?: boolean = false;
}

export class ServiceTypeModel {
    svcTypeId: number = 0;
    svcTypeCode: string = '';
    svcTypeName: string = '';
    isActive: boolean = true;
    userServiceRole = [];
}
