import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../api/product";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
};
