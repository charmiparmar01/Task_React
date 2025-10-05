import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, Divider } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { clearCart, updateQty, removeFromCart } from '../features/cart/cartSlice';

const Checkout: React.FC = () => {
  const items = useAppSelector((s) => s.cart.items);
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const total = items.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  const handleQtyChange = (id: number, newQty: number) => {
    if (!token) {
      alert('Please login first to modify cart.');
      return;
    }
    if (newQty <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQty({ id, qty: newQty }));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Checkout</Typography>
      <List>
        {items.map((it) => (
          <ListItem
            key={it.product.id}
            secondaryAction={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant='outlined' onClick={() => handleQtyChange(it.product.id, it.qty - 1)}>
                  -
                </Button>
                <Button variant='outlined' onClick={() => handleQtyChange(it.product.id, it.qty + 1)}>
                  +
                </Button>
                <Button variant='outlined' color="error" onClick={() => handleQtyChange(it.product.id, 0)}>
                  Remove
                </Button>
              </Box>
            }
          >
            <ListItemText primary={it.product.title} secondary={`₹${it.product.price} x ${it.qty}`} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Total: ₹{total.toFixed(2)}</Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            if (!token) {
              alert('Please login first to place order.');
              return;
            }
            dispatch(clearCart());
            alert('Order Placed Successfully!');
          }}
          disabled={items.length === 0}
        >
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
