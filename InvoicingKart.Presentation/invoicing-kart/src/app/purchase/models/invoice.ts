import { Customer } from "../../customer/models/customer";
import { CartItem } from "./cart-item";

export interface Invoice {
    customer: Customer;
    items: CartItem[];
    totalAmount: number;
    discount: number; 
    tax: number;
    paymentMethod: string;
}