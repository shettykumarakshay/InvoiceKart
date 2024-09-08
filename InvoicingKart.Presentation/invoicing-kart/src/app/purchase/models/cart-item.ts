import { Product } from "../../product/models/product";

export interface CartItem {
    product: Product;
    quantity: number;
}