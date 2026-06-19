import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../api/category";

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createCategory(data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
};
