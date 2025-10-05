import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button} from '@mui/material';
import type { Product } from '../types';

const ProductCard: React.FC<{ product: Product; onAdd: (p: Product) => void }> = ({ product, onAdd }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height={'60%'}
        width={'100%'}
        image={product.thumbnail}
        alt={product.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{maxHeight: 250, maxWidth: 370 }}>
        <Typography variant="subtitle1" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          ₹{product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => onAdd(product)}
          sx={{ ml: 1, mb: 1 }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
