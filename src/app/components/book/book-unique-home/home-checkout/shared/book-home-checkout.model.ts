export class BookHomeCheckoutDetailModel {
  bookingId: number = 0;
  svcId: number = 0;
  svcTypeId: number = 0;
  status: number = 0;
  ownerUserId: number = 0;
  bookStay:BookStayDetail = new BookStayDetail();   
  bookCharges: Array<BookCharge> = [];   
  attachment:AttachmentModel = new AttachmentModel();
    
}
export class AttachmentModel {
  attachmentId: number = 0;
  attachmentType: number = 2;
  fileName: string;
  genId: number = 0;
  svcTypeId: number = 0;
  remarks: string;
  attachmmentStatus: number = 33;
  attachmentDataBase64: string; 
  attachmentUrl: string;
}

export class BookCharge {
  svcCatgId: number = 0;
  svcSCatgId: number = 0;
  amount: number = 0;
}

export class BookStayDetail {
  bookingId:number = 0;
  genId:number = 0;
  checkIn:string= "";
  checkOut:string= "";
  noOfDays:number = 0;
  noOfAdultGuests:number = 0;
  noOfChildGuests:number = 0;
  guestName:string= "";
  emailId:string= "";
  contactNumber:string = '';
  remarks:string= "";
  guestIdType:number = 0;
  isActive: true

}

export class BookingDetailsModel {
  svcId: number = 0;
  CityName: string = '';
  NumberofGuestsInRoom: number = 0;
  CheckIn: string = '';
  CheckOut: string = '';
  numberOfDays:number = 0;
  totalPrice:number = 0;
}
