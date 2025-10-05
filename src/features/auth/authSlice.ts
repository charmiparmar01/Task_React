import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      try {
        localStorage.setItem('token', action.payload.token);
      } catch {}
    },
    logout(state) {
      state.token = null;
      try {
        localStorage.removeItem('token');
      } catch {}
    },
  },
});

export const { setCredentials, logout } = slice.actions;
export default slice.reducer;
