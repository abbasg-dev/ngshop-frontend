import { Product } from "./order";

export class Cart {
    items?: CartItem[];
}

export class CartItem {
    productId?: string;
    quantity?: number;
}

export class CartItemDetailed {
    product?: Product;
    quantity?: number
}