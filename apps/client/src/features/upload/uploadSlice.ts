import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUploadFile } from './uploadAPI';
import { UploadState, UploadFilePayload } from "./uploadInterfaces";
import { FetchStatuses, File } from '../common/commonInterfaces';


const initialState: UploadState = {
  file: null,
  status: FetchStatuses.IDLE,
};

export const uploadFileThunk = createAsyncThunk(
  'upload/file',
  async (payload: UploadFilePayload) => {
    const response = await fetchUploadFile(payload);
    return response.data as File;
  }
);

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileThunk.pending, (state) => {
        state.status = FetchStatuses.PENDING;
        state.file = null;
      })
      .addCase(uploadFileThunk.fulfilled, (state, action) => {
        state.status = FetchStatuses.SUCCEDED;
        state.file = action.payload;
      })
      .addCase(uploadFileThunk.rejected, (state) => {
        state.status = FetchStatuses.FAILED;
      });
  },
});

export const selectFile = (state: RootState) => state.upload.file;
export const selectStatus = (state: RootState) => state.upload.status;

export default uploadSlice.reducer;
