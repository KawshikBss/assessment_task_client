import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../api/category";

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateCategory(id, data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
};
