import React, { useState } from 'react';
import { Container, Grid, CircularProgress, Box, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import PaginationControl from '../components/PaginationControl';
import { useGetProductsQuery, useGetProductsByCategoryQuery } from '../services/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types';

const PAGE_SIZE = 12;

const Home: React.FC = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const skip = (page - 1) * PAGE_SIZE;
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);

  const generalQuery = useGetProductsQuery({ limit: PAGE_SIZE, skip }, { skip: !!category });
  const catQuery = useGetProductsByCategoryQuery({ category: category ?? '', limit: PAGE_SIZE, skip }, { skip: !category });

  const isLoading = category ? catQuery.isLoading : generalQuery.isLoading;
  const isError = category ? catQuery.isError : generalQuery.isError;
  const data = category ? catQuery.data : generalQuery.data;
  const error = category ? catQuery.error : generalQuery.error;

  const handleAdd = (product: Product) => {
    if (!token) {
      alert('Please login first to add products to cart.');
      return;
    }
    dispatch(addToCart(product));
  };

  const handleCategoryChange = (v: string | null) => {
    setCategory(v);
    setPage(1);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h6">Products</Typography>
        <CategoryFilter value={category} onChange={handleCategoryChange} />
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography color="error">Failed to load products. {(error as any)?.error ?? ''}</Typography>
        </Box>
      ) : !data || data.products.length === 0 ? (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography>No products found.</Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {data.products.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <ProductCard product={p} onAdd={handleAdd} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <PaginationControl
              page={page}
              count={Math.max(1, Math.ceil((data?.total ?? 1) / PAGE_SIZE))}
              onChange={(p) => setPage(p)}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
