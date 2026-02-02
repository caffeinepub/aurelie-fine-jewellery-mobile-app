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
export interface UserProfile {
    name: string;
    email: string;
    address: string;
    phone: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CustomerInquiry {
    id: string;
    customer: Principal;
    name: string;
    email: string;
    message: string;
    response?: string;
}
export interface Order {
    id: string;
    status: OrderStatus;
    totalPriceInCents: bigint;
    customer: Principal;
    productId: string;
    cancellable: boolean;
    timestamp: bigint;
    upiId: string;
    quantity: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderCreate {
    id: string;
    totalPriceInCents: bigint;
    customer: Principal;
    productId: string;
    upiId: string;
    quantity: bigint;
}
export type OrderStatus = {
    __kind__: "shipped";
    shipped: null;
} | {
    __kind__: "cancelled";
    cancelled: {
        reason: string;
    };
} | {
    __kind__: "pending";
    pending: null;
} | {
    __kind__: "delivered";
    delivered: null;
} | {
    __kind__: "confirmed";
    confirmed: null;
};
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface SiteContent {
    generalDisclaimer: string;
    aboutUs: string;
    billingPolicy: string;
    privacyPolicy: string;
    shippingPolicy: string;
    officialName: string;
    generalInfo: string;
    address: string;
    contactEmail: string;
    phoneNumber: string;
    footerContent: string;
    termsOfService: string;
}
export interface CancelReason {
    reason: string;
}
export interface Product {
    id: string;
    inStock: boolean;
    name: string;
    description: string;
    image: ExternalBlob;
    priceInCents: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    assignAdminRole(userPrincipal: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelOrder(orderId: string, cancelReason: CancelReason): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(input: OrderCreate): Promise<void>;
    deleteProduct(productId: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<{
        address: string;
        contactEmail: string;
        phoneNumber: string;
    }>;
    getCustomerInquiries(): Promise<Array<CustomerInquiry>>;
    getCustomerOrders(): Promise<Array<Order>>;
    getInquiries(): Promise<Array<CustomerInquiry>>;
    getInquiry(inquiryId: string): Promise<CustomerInquiry>;
    getOrder(orderId: string): Promise<Order>;
    getOrders(): Promise<Array<Order>>;
    getProduct(productId: string): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    getSiteContent(): Promise<SiteContent>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWebsiteMetadata(): Promise<{
        privacyPolicy: string;
        officialName: string;
        termsOfService: string;
    }>;
    isCallerAdmin(): Promise<boolean>;
    isOrderCancellable(orderId: string): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    respondToInquiry(inquiryId: string, response: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitInquiry(inquiry: CustomerInquiry): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>;
    updateProduct(product: Product): Promise<void>;
    updateSiteContent(newContent: SiteContent): Promise<void>;
}
