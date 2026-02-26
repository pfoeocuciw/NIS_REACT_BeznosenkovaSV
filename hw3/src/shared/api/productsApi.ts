import { baseApi } from "./baseApi";
import type { Product, ProductsResponse } from "@/entities/user/product/model/types";

export const productsApi = baseApi.injectEndpoints({
    endpoints: (b) => ({
        getProducts: b.query<ProductsResponse, { limit: number; skip: number; q?: string }>({
            query: ({ limit, skip, q }) =>
                q?.trim()
                    ? { url: "/products/search", params: { q, limit, skip } }
                    : { url: "/products", params: { limit, skip } },
            providesTags: (res) =>
                res
                    ? [
                        ...res.products.map((p) => ({ type: "Product" as const, id: p.id })),
                        { type: "Products" as const, id: "LIST" },
                    ]
                    : [{ type: "Products" as const, id: "LIST" }],
        }),
        getProductById: b.query<Product, number>({
            query: (id) => ({ url: `/products/${id}` }),
            providesTags: (_r, _e, id) => [{ type: "Product", id }],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;