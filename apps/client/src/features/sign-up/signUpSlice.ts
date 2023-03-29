import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchSignUp } from './signUpAPI';
import { SignUpState, SignUpPayload, User } from './signUpInterfaces';
import { FetchStatuses } from '../common/commonInterfaces';

const initialState: SignUpState = {
  user: null,
  status: FetchStatuses.IDLE,
};

export const signUpThunk = createAsyncThunk(
  "auth/sign-up",
  async (payload: SignUpPayload) => {
    const response = await fetchSignUp(payload);
    return response.data as User;
  }
);
export const signUpSlice = createSlice({
  name: 'sign-up',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.status = FetchStatuses.PENDING;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.status = FetchStatuses.SUCCEDED;
        state.user = action.payload;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.status = FetchStatuses.FAILED;
      });
  },
});

export const selectUser = (state: RootState) => state.signUp.user;
export const selectStatus = (state: RootState) => state.signUp.status;
export default signUpSlice.reducer;
