import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'http://<YOUR_BACKEND_HOST>:5000/api'; // replace <YOUR_BACKEND_HOST> with your IP or localhost

const instance = axios.create({ baseURL: API_BASE });

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
