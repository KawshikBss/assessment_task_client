import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../api/product";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateProduct(id, data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
};
