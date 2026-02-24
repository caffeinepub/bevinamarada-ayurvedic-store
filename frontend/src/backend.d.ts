import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    imageUrl?: string;
    isHidden: boolean;
    quantity: bigint;
    category: ProductCategory;
    price: bigint;
}
export interface Customer {
    id: bigint;
    name: string;
    isRepeatCustomer: boolean;
    phone: string;
}
export type Time = bigint;
export interface SalesReport {
    monthlySales: bigint;
    productWiseSales: Array<[bigint, bigint]>;
    dailySales: bigint;
    totalSales: bigint;
}
export interface AdminDashboard {
    totalProducts: bigint;
    outOfStockProducts: bigint;
    todaysIncome: bigint;
    totalIncome: bigint;
    totalEnquiries: bigint;
    monthlyIncome: bigint;
}
export interface Enquiry {
    id: bigint;
    name: string;
    createdAt: Time;
    message: string;
    phone: string;
}
export interface UserProfile {
    name: string;
    role: string;
}
export enum ProductCategory {
    clothing = "clothing",
    food = "food",
    toys = "toys",
    furniture = "furniture",
    electronics = "electronics"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCustomer(name: string, phone: string): Promise<bigint>;
    addEnquiry(name: string, phone: string, message: string): Promise<bigint>;
    addProduct(name: string, category: ProductCategory, price: bigint, quantity: bigint, imageUrl: string | null): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    editProduct(id: bigint, name: string, category: ProductCategory, price: bigint, quantity: bigint, imageUrl: string | null): Promise<void>;
    getAdminDashboard(): Promise<AdminDashboard>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomers(): Promise<Array<Customer>>;
    getMonthlySalesReport(): Promise<SalesReport>;
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getTodaysEnquiries(): Promise<Array<Enquiry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hideProduct(id: bigint): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateRepeatCustomerStatus(id: bigint): Promise<void>;
}
