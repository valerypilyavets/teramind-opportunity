import axios from "axios";
import { AxiosResponse } from 'axios';

export async function fetchFilesList(): Promise<AxiosResponse> {
  return await axios.get('/files');
}