import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

const NavBar: React.FC = () => {
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.qty, 0));
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
          E-Shop
        </Typography>

        {token ? (
          <>
            <Button color="inherit" onClick={handleLogout} sx={{ mr: 2 }}>
              Logout
            </Button>
            <IconButton component={Link} to="/checkout" size="large" color="inherit" aria-label="cart">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </>
        ) : (
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
