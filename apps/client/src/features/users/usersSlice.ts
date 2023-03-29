import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { FetchStatuses } from '../common/commonInterfaces';
import { UsersState, User } from './usersInterfaces';
import { fetchSelf } from './usersAPI';
import Cookies from 'js-cookie';

const initialState: UsersState = {
  user: null,
  status: FetchStatuses.IDLE,
};

export const selfThink = createAsyncThunk(
  "users/me",
  async () => {
    const response = await fetchSelf();
    return response.data as User;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(selfThink.pending, (state) => {
        state.status = FetchStatuses.PENDING;
      })
      .addCase(selfThink.fulfilled, (state, action) => {
        state.status = FetchStatuses.SUCCEDED;
        state.user = action.payload;
      })
      .addCase(selfThink.rejected, (state) => {
        state.status = FetchStatuses.FAILED;
      })
  },
});

export const selectUser = (state: RootState) => state.users.user;
export const selectUserStatus = (state: RootState) => state.users.status;
export default usersSlice.reducer;
