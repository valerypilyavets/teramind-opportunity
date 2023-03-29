import { UploadFilePayload } from './uploadInterfaces';
import axios from 'axios';
import { AxiosResponse } from 'axios';

export async function fetchUploadFile(payload: UploadFilePayload): Promise<AxiosResponse> {
  return await axios.post('/files', payload);
}