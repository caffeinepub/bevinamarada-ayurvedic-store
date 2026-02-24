import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface IncomeSummary {
    todaysIncome: bigint;
    totalIncome: bigint;
    monthlyIncome: bigint;
}
export interface StockItem {
    id: bigint;
    lowStockThreshold: bigint;
    name: string;
    isLowStock: boolean;
    quantity: bigint;
    category: string;
    image?: ExternalBlob;
    unitPrice: bigint;
    isTrending: boolean;
}
export interface Sale {
    id: bigint;
    stockItemId: bigint;
    timestamp: bigint;
    quantity: bigint;
    totalPrice: bigint;
}
export interface RevenueOverview {
    productBreakdown: Array<[bigint, bigint]>;
    totalRevenue: bigint;
    monthlyRevenue: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addSale(stockItemId: bigint, quantity: bigint): Promise<bigint>;
    addStockItem(name: string, category: string, quantity: bigint, unitPrice: bigint, lowStockThreshold: bigint, image: ExternalBlob | null): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteStockItem(id: bigint): Promise<void>;
    getAllStockItems(): Promise<Array<StockItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getIncomeSummary(): Promise<IncomeSummary>;
    getLowStockItems(): Promise<Array<StockItem>>;
    getRevenueOverview(): Promise<RevenueOverview>;
    getTodaysSales(): Promise<Array<Sale>>;
    getTrendingStockItems(): Promise<Array<StockItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markTrendingStockItem(id: bigint, isTrending: boolean): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateStockItem(id: bigint, name: string, category: string, quantity: bigint, unitPrice: bigint, lowStockThreshold: bigint, image: ExternalBlob | null): Promise<void>;
}
