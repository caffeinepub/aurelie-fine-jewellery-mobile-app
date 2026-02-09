import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob } from '../backend';

// Query hook for getting carousel images for a specific category and carousel index
export function useGetCategoryCarouselImages(categorySlug: string, carouselIndex: 1 | 2) {
  const { actor, isFetching } = useActor();

  return useQuery<ExternalBlob[]>({
    queryKey: ['categoryCarousel', categorySlug, carouselIndex],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategoryCarousel(categorySlug, BigInt(carouselIndex));
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
  });
}

// Mutation hook for updating carousel images
export function useUpdateCategoryCarouselImages(categorySlug: string, carouselIndex: 1 | 2) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (images: ExternalBlob[]) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateCategoryCarousel(categorySlug, BigInt(carouselIndex), images);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryCarousel', categorySlug, carouselIndex] });
    },
  });
}
