import { environment } from "../../environments/environment.development";

export const API_ENDPOINTS = {
    products: environment.APIBaseURL + 'Product',
    customers: environment.APIBaseURL + 'Customer',
    category: environment.APIBaseURL + 'Category',
};