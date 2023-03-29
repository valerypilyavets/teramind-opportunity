import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFilesList } from './filesAPI';
import { FilesListState } from './filesInterfaces';
import { FetchStatuses } from '../common/commonInterfaces';
import { RootState } from '../../app/store';


const initialState: FilesListState = {
  files: null,
  status: FetchStatuses.IDLE,
};
export const filesListThunk = createAsyncThunk(
  'files/list',
  async () => {
    const response = await fetchFilesList();
    return response.data;
  }
);

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filesListThunk.pending, (state) => {
        state.status = FetchStatuses.PENDING;
      })
      .addCase(filesListThunk.fulfilled, (state, action) => {
        state.status = FetchStatuses.SUCCEDED;
        state.files = action.payload;
      })
      .addCase(filesListThunk.rejected, (state) => {
        state.status = FetchStatuses.FAILED;
      });
  },
});

export const selectFiles = (state: RootState) => state.files.files;

export default filesSlice.reducer;
