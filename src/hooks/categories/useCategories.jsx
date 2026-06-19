import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../api/category";

export const useCategories = () => {
    return useInfiniteQuery({
        queryKey: ["categories"],
        queryFn: ({ pageParam = 1 }) => getAllCategories(pageParam),
        getNextPageParam: (lastPage) => {
            const { current_page, last_page } = lastPage.data;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });
};
