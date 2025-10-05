import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, ProductResponse } from '../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers) => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) headers.set('Authorization', `Bearer ${token}`);
      } catch {
        console.log('No token found');
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; [k: string]: any }, { username: string; password: string; expiresInMins?: number }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          ...credentials,
          expiresInMins: credentials.expiresInMins ?? 30,
        },
      }),
    }),
    getProducts: builder.query<ProductResponse, { limit?: number; skip?: number } | void>({
      query: (params = { limit: 12, skip: 0 }) =>
        `/products?limit=${params.limit ?? 12}&skip=${params.skip ?? 0}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => '/products/categories',
    }),
    getProductsByCategory: builder.query<ProductResponse, { category: string; limit?: number; skip?: number }>({
      query: ({ category, limit = 12, skip = 0 }) =>
        `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = api;
