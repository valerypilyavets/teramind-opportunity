import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchSignIn } from './signInAPI';
import { SignInPayload, SignInState } from './signInInterfaces';
import { User } from '../users/usersInterfaces';
import { FetchStatuses } from '../common/commonInterfaces';
import Cookies from 'js-cookie';

const initialState: SignInState = {
  isAuthorised: Boolean(Cookies.get('connect.sid')),
  status: FetchStatuses.IDLE,
};

export const signInThunk = createAsyncThunk(
  "auth/sign-in",
  async (payload: SignInPayload) => {
    const response = await fetchSignIn(payload);
    return response.data as User;
  }
);

export const signInSlice = createSlice({
  name: 'sign-in',
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthorised = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.status = FetchStatuses.PENDING;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.status = FetchStatuses.SUCCEDED;
        state.isAuthorised = true;
      })
      .addCase(signInThunk.rejected, (state) => {
        state.status = FetchStatuses.FAILED;
      })
  },
});

export const { signOut } = signInSlice.actions;

export const selectStatus = (state: RootState) => state.signIn.status;
export const selectIsAuthorised = (state: RootState) => state.signIn.isAuthorised;
export default signInSlice.reducer;
