import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '@/auth';
import { request } from '@/requests';

// Initial state
const INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ loginData }, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.login({ loginData });
      if (data.success) {
        const authState = {
          current: data.result,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(authState));
        window.localStorage.removeItem('isLogout');
        return data.result;
      } else {
        return rejectWithValue('Login failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ registerData }, { rejectWithValue }) => {
    try {
      const data = await authService.register({ registerData });
      if (data.success) {
        return data.result;
      } else {
        return rejectWithValue('Registration failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async ({ userId, emailToken }, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.verify({ userId, emailToken });
      if (data.success) {
        const authState = {
          current: data.result,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(authState));
        window.localStorage.removeItem('isLogout');
        return data.result;
      } else {
        return rejectWithValue('Verification failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ resetPasswordData }, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.resetPassword({ resetPasswordData });
      if (data.success) {
        const authState = {
          current: data.result,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(authState));
        window.localStorage.removeItem('isLogout');
        return data.result;
      } else {
        return rejectWithValue('Reset password failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const result = window.localStorage.getItem('auth');
      const tmpAuth = JSON.parse(result);
      const settings = window.localStorage.getItem('settings');
      const tmpSettings = JSON.parse(settings);
      window.localStorage.removeItem('auth');
      window.localStorage.removeItem('settings');
      window.localStorage.setItem('isLogout', JSON.stringify({ isLogout: true }));

      const data = await authService.logout();
      if (data.success) {
        return true;
      } else {
        const authState = {
          current: tmpAuth,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(authState));
        window.localStorage.setItem('settings', JSON.stringify(tmpSettings));
        window.localStorage.removeItem('isLogout');
        return rejectWithValue('Logout failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ entity, jsonData }, { dispatch, rejectWithValue }) => {
    try {
      const data = await request.updateAndUpload({ entity, id: '', jsonData });
      if (data.success) {
        const authState = {
          current: data.result,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(authState));
        return data.result;
      } else {
        return rejectWithValue('Update profile failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    resetState: () => INITIAL_STATE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(verify.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.current = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(verify.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.current = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.current = {};
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.current = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.current = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export actions and reducer
export const { resetState } = authSlice.actions;
export default authSlice.reducer;
