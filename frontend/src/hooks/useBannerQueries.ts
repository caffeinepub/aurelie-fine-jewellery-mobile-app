import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BannerMessage } from '../backend';

// Get all banner messages (admin only)
export function useGetAllBannerMessages() {
  const { actor, isFetching } = useActor();

  return useQuery<BannerMessage[]>({
    queryKey: ['bannerMessages', 'all'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllBannerMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

// Get enabled banner messages (public)
export function useGetEnabledBannerMessages() {
  const { actor, isFetching } = useActor();

  return useQuery<BannerMessage[]>({
    queryKey: ['bannerMessages', 'enabled'],
    queryFn: async () => {
      if (!actor) return [];
      const allMessages = await actor.getAllBannerMessages();
      return allMessages
        .filter(msg => msg.enabled)
        .sort((a, b) => Number(a.order) - Number(b.order));
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// Add banner message
export function useAddBannerMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { message: string; order: bigint; enabled: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addBannerMessage(params.message, params.order, params.enabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bannerMessages'] });
    },
  });
}

// Update banner message
export function useUpdateBannerMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { order: bigint; message: string; enabled: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateBannerMessage(params.order, params.message, params.enabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bannerMessages'] });
    },
  });
}

// Delete banner message
export function useDeleteBannerMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteBannerMessage(order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bannerMessages'] });
    },
  });
}
