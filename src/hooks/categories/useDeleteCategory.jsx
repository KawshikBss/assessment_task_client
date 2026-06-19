import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../api/category";

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteCategory(id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
};
