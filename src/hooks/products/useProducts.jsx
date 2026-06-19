import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/product";

export const useProducts = () => {
    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: ({ pageParam = 1 }) => getAllProducts(pageParam),
        getNextPageParam: (lastPage) => {
            const { current_page, last_page } = lastPage.data;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });
};
