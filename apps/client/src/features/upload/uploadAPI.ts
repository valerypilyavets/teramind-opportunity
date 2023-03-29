import axios from 'axios';
import { AxiosResponse } from 'axios';

export async function fetchUploadFile(payload: FormData): Promise<AxiosResponse> {
  return await axios.post('/files', payload);
}