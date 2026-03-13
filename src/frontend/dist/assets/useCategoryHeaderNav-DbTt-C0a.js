import { a as useActor, b as useQuery, au as useQueryClient, av as useMutation } from "./index-B1_sVdMb.js";
function useGetAllCategoryHeaders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["categoryHeaders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategoryHeaders();
    },
    enabled: !!actor && !isFetching
  });
}
function useSetCategoryHeader() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      categorySlug,
      header
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.setCategoryHeader(categorySlug, header);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryHeaders"] });
      queryClient.invalidateQueries({ queryKey: ["categoryHeader"] });
    }
  });
}
export {
  useSetCategoryHeader as a,
  useGetAllCategoryHeaders as u
};
