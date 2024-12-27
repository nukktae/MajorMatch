import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Profile } from '../../types/Profile';

interface ProfileState {
  data: Profile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  error: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const { setProfile, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer; 