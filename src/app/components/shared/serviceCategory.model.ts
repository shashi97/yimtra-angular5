export class ServiceCategoryModel {

  svcCatgId: number = 0;
  svcCatgCode: string;
  svcCatgDesc: string;
  serviceSubCategory: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
  isActive: boolean;
}

export class ServiceSubCategoryModel {
  svcSCatgId: number = 0;
  svcSCatgCode: string;
  svcSCatgDesc: string;
  svcCatgId: number = 0;
  isActive: boolean;
}
