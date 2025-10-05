import React, { useState } from 'react';
import { Container, TextField, Button, Box, Alert } from '@mui/material';
import { useLoginMutation } from '../services/api';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('emilys'); 
  const [password, setPassword] = useState('emilyspass'); 
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res: any = await login({
        username: username.trim(),
        password,
        expiresInMins: 30,
      }).unwrap();

      if (!res?.accessToken) {
        console.error('Login response without accessToken:', res);
        throw new Error('Login failed — accessToken missing. See console for response.');
      }

      dispatch(setCredentials({ token: res.accessToken }));

      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      const serverMsg = err?.data?.message ?? err?.message ?? undefined;
      setError(serverMsg ? String(serverMsg) : 'Login failed. Check credentials or open console for details.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 6, display: 'grid', gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          Login
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <small>
          Tip: demo username <code>emilys</code>, password <code>emilyspass</code>
        </small>
      </Box>
    </Container>
  );
};

export default Login;
