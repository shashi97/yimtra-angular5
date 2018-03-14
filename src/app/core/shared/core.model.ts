import { AttachmentModel, Reviews } from '../../components/host/shared';

export class CMSModel {
    attachment: Array<AttachmentModel> = new Array<AttachmentModel>();
    review: Array<Reviews> = new Array<Reviews>();
    systemConstant: SystemConstant = new SystemConstant();
    attachmentId: number = 0;
    cmsUrl: string = '';
    cmsid: number = 0;
    genId: number = 0;
    isActive: boolean = false;
    isDeleted: boolean = false;
    svcSCatgDesc: string = '';
    sysConstantCode: number = 0;
    sysConstantDesc: string = '';
    sysConstantId: number = 0;
    sysConstantMainId: number = 0;
    type: number = 0;
}


export class SystemConstant {
    enabled: boolean = false;
    isActive: boolean = false;
    svcCatgCode: string = '';
    sysConstValue: string = '';
    sysConstantCode: number = 0;
    sysConstantDesc: string = '';
    sysConstantId: number = 0;
    visible: boolean = false;
}
