export class SignIn {
    UserName: string = '';
    Password: string = '';
    provider: string = '';
    AccessToken: string = '';
    rememberMe: boolean = false;
}

export class SignUp {
    // userName: string = '';
    userContactNo: number;
    userEmail: string = '';
    userPwd: string = '';
    isAgreeTerms: boolean = true;
}

export class Token {
    AccessToken: string = '';
    ExpiresIn: number = 0;
    UserName: string = '';
    User: UserModal = new UserModal();
}

export class UserModal {
    Gender: number = 0;
    IsActive: true
    ServiceTypes: Array<any> = [];
    UserContactNo: string = '';
    UserEmail: string = '';
    UserFirstName: string = '';
    UserId: number = 0;
    UserLastName: string = '';
    UserMiddleName: string = '';
    UserName: string = '';
    UserPwd: string = '';
    UserStatus: number = 0;
    UserTypeId: number = 0;
}


export class SocialModal {
    email: string = '';
    firstName: string = '';
    providerType: string = '';
    providerKey: string = '';
    lastName: string = '';
    name: string = '';
}



