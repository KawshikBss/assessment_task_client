import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/product";

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createProduct(data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
};
