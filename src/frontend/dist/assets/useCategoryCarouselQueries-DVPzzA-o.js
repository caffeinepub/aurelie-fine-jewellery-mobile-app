import { o as useActor, p as useQuery, ac as useQueryClient, ad as useMutation } from "./index-aj0lqbRn.js";
function useGetCategoryCarouselImages(categorySlug, carouselIndex) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["categoryCarousel", categorySlug, carouselIndex],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategoryCarousel(categorySlug, BigInt(carouselIndex));
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    refetchInterval: 3e4
  });
}
function useUpdateCategoryCarouselImages(categorySlug, carouselIndex) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (images) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateCategoryCarousel(
        categorySlug,
        BigInt(carouselIndex),
        images
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categoryCarousel", categorySlug, carouselIndex]
      });
    }
  });
}
function useGetCarouselRedirect(categorySlug) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["carouselRedirect", categorySlug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCarouselRedirect(categorySlug);
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateCarouselRedirect(categorySlug) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (redirectUrl) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateCarouselRedirect(categorySlug, redirectUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carouselRedirect", categorySlug]
      });
    }
  });
}
export {
  useGetCarouselRedirect as a,
  useUpdateCategoryCarouselImages as b,
  useUpdateCarouselRedirect as c,
  useGetCategoryCarouselImages as u
};
