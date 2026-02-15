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
export interface Product {
    id: string;
    media: ProductMedia;
    inStock: boolean;
    name: string;
    description: string;
    category: string;
    priceInCents: bigint;
}
export interface CarouselSlide {
    order: bigint;
    enabled: boolean;
    visualContent: ExternalBlob;
    urlRedirect: string;
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
export interface ShippingAddress {
    name: string;
    email: string;
    address: string;
    phone: string;
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
    shippingAddress: ShippingAddress;
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
    shippingAddress: ShippingAddress;
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
export interface ProductCreate {
    id: string;
    media: ProductMedia;
    inStock: boolean;
    name: string;
    description: string;
    category: string;
    priceInCents: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface ProductMedia {
    video?: ExternalBlob;
    images: Array<ExternalBlob>;
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
export interface UserProfile {
    dob: string;
    name: string;
    email: string;
    address: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCategorySlide(category: string, newSlide: CarouselSlide): Promise<void>;
    addProduct(product: ProductCreate): Promise<void>;
    assignAdminRole(userPrincipal: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelOrder(orderId: string, cancelReason: CancelReason): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(input: OrderCreate): Promise<void>;
    deleteProduct(productId: string): Promise<void>;
    getAllCategorySlides(category: string): Promise<Array<CarouselSlide>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCarouselRedirect(category: string): Promise<string | null>;
    getCategoryCarousel(category: string, carouselNumber: bigint): Promise<Array<ExternalBlob>>;
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
    removeCategorySlide(category: string, slideIndex: bigint): Promise<void>;
    reorderCategorySlides(category: string, newOrder: Array<bigint>): Promise<void>;
    respondToInquiry(inquiryId: string, response: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitInquiry(inquiry: CustomerInquiry): Promise<void>;
    toggleCategorySlide(category: string, slideIndex: bigint, enabled: boolean): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCarouselRedirect(category: string, redirectUrl: string): Promise<void>;
    updateCategoryCarousel(category: string, carouselNumber: bigint, images: Array<ExternalBlob>): Promise<void>;
    updateCategorySlide(category: string, slideIndex: bigint, updatedSlide: CarouselSlide): Promise<void>;
    updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>;
    updateProduct(product: ProductCreate): Promise<void>;
    updateSiteContent(newContent: SiteContent): Promise<void>;
}
