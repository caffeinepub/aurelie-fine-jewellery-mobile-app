import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { Product, Order, CustomerInquiry, OrderStatus, SiteContent, CancelReason, OrderCreate, UserProfile, CarouselSlide, ProductCreate } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// Admin Check
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['isAdmin', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && !!identity,
  });
}

// Carousel Queries (Homepage)
export function useGetCarouselSlides() {
  const { actor, isFetching } = useActor();

  return useQuery<CarouselSlide[]>({
    queryKey: ['carouselSlides', 'homepage'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategorySlides('homepage');
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
  });
}

export function useUpdateCarouselSlide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slideIndex, updatedSlide }: { slideIndex: number; updatedSlide: CarouselSlide }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateCategorySlide('homepage', BigInt(slideIndex), updatedSlide);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carouselSlides', 'homepage'] });
    },
  });
}

export function useToggleCarouselSlide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slideIndex, enabled }: { slideIndex: number; enabled: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.toggleCategorySlide('homepage', BigInt(slideIndex), enabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carouselSlides', 'homepage'] });
    },
  });
}

export function useReorderCarouselSlides() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newOrder: number[]) => {
      if (!actor) throw new Error('Actor not available');
      await actor.reorderCategorySlides('homepage', newOrder.map(n => BigInt(n)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carouselSlides', 'homepage'] });
    },
  });
}

// Category Carousel Queries
export function useGetCategorySlides(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<CarouselSlide[]>({
    queryKey: ['carouselSlides', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategorySlides(category);
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
  });
}

export function useUpdateCategorySlide(category: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slideIndex, updatedSlide }: { slideIndex: number; updatedSlide: CarouselSlide }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateCategorySlide(category, BigInt(slideIndex), updatedSlide);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carouselSlides', category] });
    },
  });
}

export function useToggleCategorySlide(category: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slideIndex, enabled }: { slideIndex: number; enabled: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.toggleCategorySlide(category, BigInt(slideIndex), enabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carouselSlides', category] });
    },
  });
}

export function useReorderCategorySlides(category: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newOrder: number[]) => {
      if (!actor) throw new Error('Actor not available');
      await actor.reorderCategorySlides(category, newOrder.map(n => BigInt(n)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carouselSlides', category] });
    },
  });
}

// Product Queries
export function useGetProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProduct(productId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: ProductCreate) => {
      if (!actor) throw new Error('Actor not available');
      await actor.addProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: ProductCreate) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// Order Queries
export function useGetOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    refetchInterval: 15000,
  });
}

export function useGetCustomerOrders() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Order[]>({
    queryKey: ['customerOrders', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCustomerOrders();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetOrder(orderId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Order>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && !!orderId,
  });
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderInput: OrderCreate) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createOrder(orderInput);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['customerOrders'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateOrderStatus(orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['customerOrders'] });
    },
  });
}

export function useCancelOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, reason }: { orderId: string; reason: string }) => {
      if (!actor) throw new Error('Actor not available');
      const cancelReason: CancelReason = { reason };
      await actor.cancelOrder(orderId, cancelReason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['customerOrders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
}

export function useIsOrderCancellable(orderId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['orderCancellable', orderId],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isOrderCancellable(orderId);
    },
    enabled: !!actor && !isFetching && !!orderId,
    refetchInterval: 60000,
  });
}

// Inquiry Queries
export function useGetInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<CustomerInquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCustomerInquiries() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<CustomerInquiry[]>({
    queryKey: ['customerInquiries', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCustomerInquiries();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inquiry: CustomerInquiry) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitInquiry(inquiry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['customerInquiries'] });
    },
  });
}

export function useRespondToInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ inquiryId, response }: { inquiryId: string; response: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.respondToInquiry(inquiryId, response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['customerInquiries'] });
    },
  });
}

// Site Content Queries
export function useGetSiteContent() {
  const { actor, isFetching } = useActor();

  return useQuery<SiteContent>({
    queryKey: ['siteContent'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getSiteContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContactInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<{ contactEmail: string; phoneNumber: string; address: string }>({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSiteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: SiteContent) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateSiteContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteContent'] });
      queryClient.invalidateQueries({ queryKey: ['contactInfo'] });
    },
  });
}
