import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CategoryHeader } from '../backend';

export function useGetAllCategoryHeaders() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, CategoryHeader]>>({
    queryKey: ['categoryHeaders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategoryHeaders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCategoryHeader(categorySlug: string) {
  const { actor, isFetching } = useActor();

  return useQuery<CategoryHeader | null>({
    queryKey: ['categoryHeader', categorySlug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCategoryHeader(categorySlug);
    },
    enabled: !!actor && !isFetching && !!categorySlug,
  });
}

export function useSetCategoryHeader() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categorySlug, header }: { categorySlug: string; header: CategoryHeader }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.setCategoryHeader(categorySlug, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryHeaders'] });
      queryClient.invalidateQueries({ queryKey: ['categoryHeader'] });
    },
  });
}
