import { OrderStatus } from "@blackbits/orders";

export const ORDER_STATUS: OrderStatus = {
    'Pending': {
        label: 'Pending',
        color: 'primary'
    },
    'Processed': {
        label: 'Processed',
        color: 'warning'
    },
    'Shipped': {
        label: 'Shipped',
        color: 'info'
    },
    'Delivered': {
        label: 'Delivered',
        color: 'success'
    },
    'Failed': {
        label: 'Failed',
        color: 'danger'
    }
};

export const CART_KEY = "cart";