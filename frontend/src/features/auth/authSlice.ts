import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  role: string | null;
  userId: string | null;
};

const initialState: AuthState = {
  token: null,
  role: null,
  userId: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string | null; role: string | null; userId: string | null }>) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
    clearAuth(state) {
      state.token = null;
      state.role = null;
      state.userId = null;
    }
  }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
