export class Order {
    id?: string;
    orderItems?: OrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: Phone;
    status?: number;
    totalPrice?: string;
    user?: any;
    dateOrdered?: string;
}

export class OrderItem {
    product?: any;
    quantity?: number;
}

export class OrderStatus {
    [key: string]: {
        label?: string;
        color?: string;
    }
}

export class OrderStatuses {
    id?: string;
    name?: string;
}

export class Category {
    _id?: string;
    name?: string;
    icon?: string;
    color?: string;
    checked?: boolean;
}

export class Product {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: File[];
    brand?: string;
    price?: number;
    category?: Category;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
    dateCreated?: string;
}

export class Phone {
    countryCode?: string;
    dialCode?: string;
    e164Number?: string;
    internationalNumber?: string;
    nationalNumber?: string;
    number?: string;
}