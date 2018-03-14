
export class HostModel {
    svcId: number = 0;
    svcName: string = '';
    svcDesc: string = '';
    svcTypeId: number = 0;
    countryId: number = 0;
    stateId: number = 0;
    cityId: number = 0;
    address1: string = '';
    address2: string = '';
    landmark: string = '';
    zipCode: number ;
    ownerUserId: number = 0;
    contactNo: string = '';
    svcStatus: number = 0;
    eMailId: string = '';
    remarks1: string = '';
    remarks2: string = '';
    remarks3: string = '';
    remarks4: string = '';
    createdBy: number = 0;
    creationDate: Date = new Date();
    modifiedBy: number = 0;
    modificationDate: Date = new Date();
    isActive: boolean = false;
    hostStayDetail: HostStayDetail = new HostStayDetail();
    hostServiceLinkingSubCategories: Array<HostServiceLinkingSubCategories> = Array<HostServiceLinkingSubCategories>();
    allAttachments: Array<AttachmentModel> = Array<AttachmentModel>();
    reviews: Array<Reviews> = Array<Reviews>();
    hostCharges: Array<HostCharges> = new Array<HostCharges>();
    isTermAccepted: boolean = false;
    longitude: number;
    latitude: number;
    hostVehicleRate: Array<HostVehicleRate> = new Array<HostVehicleRate>();
    hostVehicleRoute: Array<HostVehicleRoute> = new Array<HostVehicleRoute>();
}

export class HostStayDetail {
    stayId: number = 0;
    svcId: number = 0;
    listType: number = 0;
    propertyType: number = 0;
    stayName: string;
    svcTypeId: number = 0;
    numberOfRooms: number = 0;
    numberOfBeds: number = 0;
    numberOfBathRooms: number = 0;
    roomPrice: number;
    cleaningFee: number;
    numberOfGuestsInRoom: number = 0;
    bookingPreference: number = 0;
    checkInTime: Date = new Date();
    checkOutTime: Date = new Date();
    flexible: boolean;
    neighbourhood: string;
    experience: number = 0
    ownerUserId: number = 0;
    stayStatus: number = 0;
    latitude: number ;
    longitude: number;
    isActive: true;
}

export class HostServiceLinkingSubCategories {
    svcId: number = 0;
    svcCatgId: number = 0;
    svcSCatgId: number = 0;
}

export class AttachmentModel {
    attachmentId: number = 0;
    attachmentType: number = 2;
    fileName: string;
    genId: number = 0;
    svcTypeId: number = 0;
    remarks: string = '';
    attachmmentStatus: number = 33;
    attachmentDataBase64: string = '';
    // attachmentData: string;
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
    isActive: boolean = true;
}

export class HostCharges {
    svcId: number = 0;
    svcCatgId: number = 0;
    svcSCatgId: number = 0;
    amount: number = 0;
    isActive: boolean = true;
}


export class HostVehicleRate {
    rateId: number = 0;
    svcId: number = 0;
    vehicleType: number = 0;
    rate: number = 0;
    rateUOM: number = 0;
}

export class HostVehicleRoute {
    routeId: number = 0;
    svcId: number = 0;
    fromRoute: string = '';
    toRoute: string = '';
}
