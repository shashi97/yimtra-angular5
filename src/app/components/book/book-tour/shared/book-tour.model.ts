export class BookTourFilterModel {
    svcId: number = 0;
    cityName: string = 'null';
    monthValue: number = 0;
    svcCatgId :string = '46,47,48,49,50';
}


export class BookTourSearchData{

     tourId: number = 0;
     svcId: number = 0;
     totalAdultCapacity: number = 0;
     totalChildCapacity: number = 0;
     totalBookedAdultCapacity: number = 0;
     totalBookedChildCapacity: number = 0;
     pricePerPax : number = 0;
     totalPrice : number = 0;
     totalDays : number = 0;
     totalNights : number = 0;
     tourOverview : string = '';
     tourItenaryStatus : number = 0;
     leftSeats : number = 0;
     svcName :string =''; 
     svcDesc :string ='';
     svcTypeId  :number = 0;
     countryId  :number = 0;
     stateId :number = 0; 
     cityId :number = 0;
     address1 :string = '';
     address2 :string = '';
     landmark:string = ''; 
     zipCode :string = '';
     ownerUserId :number = 0;
     contactNo :string ='';
     svcStatus :number = 0;
     eMailId :string ='';
     longitude  : number = 0;
     latitude : number = 0;
     remarks1 : string = '';
     remarks2 : string = '';
     remarks3 : string = '';
     remarks4 : string = '';

     hostTourItenaries:Array<HostTourItenary> =[];
     hostTourRoutes:Array<HostTourRoutes> = [];
     attachments:Array<TourAttachments> =[];
     scheduleDates:Array<ScheduleDates> =[];
     hostTourServicies:Array<HostTourByServiceDTO>=[];

}

export class ScheduleDates{
    fromDate:Date = null;
    toDate:Date = null;
    scheduleDate:string = '';
}

export class HostTourItenary
{
    itenaryId:number = 0;
    tourId:number = 0;
    fromDay:number = 0;
    toDay:number = 0;
    location:string = '';
    locationDesc:string = '';
    hotelId:number = 0;
    hotelName:string = '';
    breakfast:boolean = false;
    lunch:boolean = false;
    dinner:boolean = false;
    eveningSnacks:boolean = false;
    detailDayDesc:string = '';
    tourItenaryStatus:number = 0;
    svcSCatgDesc:string = '';
    isNight:boolean = false;
}

export class HostTourRoutes 
    {
        tourRoutID:number = 0;
        hostTourId:number = 0;
        cityId:number = 0;
        cityName:string ='';
        countyName:string = '';
        countryId:number = 0;
        countryName:string = '';    
        stateId:number = 0;
        stateName:string = '';
        isActive:boolean = false;
    }

export class TourAttachments{
    attachmentId:number = 0;
    attachmentType:number = 0;
    fileName:string = '';
    genId:number = 0;
    svcTypeId:number = 0;
    remarks:string = '';
    attachmmentStatus:number = 0;
    isDefault:boolean = false;
    isDeleted:boolean = false;
    isTouched:boolean = false;
    attachmentDataBase64:string = '';
    attachmentData:any
    attachmentUrl :string = '';
    cmsUrl :string = '';
    objectURL:any
}


export class HostTourByServiceDTO{
    svcCatgId:number = 0;
    svcCatgCode:string = '';
    svcCatgDesc:string = '';
    isSelected:boolean = false;
    svcId:number = 0;
    hostServiceLinkingSubCategories:Array<HostServiceLinkingSubCategory> = [];
}


export class HostServiceLinkingSubCategory
{
    svcId:number = 0;
    svcCatgId:number = 0;
    svcSCatgId:number = 0;
    svcSCatgDesc:string = '';
    svcSCatgCode:string = '';
    isSelected:boolean = false;
}




