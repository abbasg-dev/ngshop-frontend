export class User {
    id?: string;
    name?: string;
    passwordHash?: string;
    email?: string;
    phone?: Phone;
    isAdmin?: true;
    street?: string;
    apartment?: string;
    zip?: string;
    city?: string;
    country?: string;
    _id?: string;
}

export class Phone {
    countryCode?: string;
    dialCode?: string;
    e164Number?: string;
    internationalNumber?: string;
    nationalNumber?: string;
    number?: string;
}

export class Country {
    id?: string;
    name?: string;
}

export declare class SocialUser {
    provider: string;
    id: string;
    email: string;
    name: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    authToken: string;
    idToken: string;
    authorizationCode: string;
    response: any;
    token?: string;
    user?: User
}

export class UserAuthenticated {
    token?: string;
    user?: User
}
