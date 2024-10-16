import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localforage from 'localforage';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl,
});
 
let isRefreshing = false;
let refreshSubscribers: any = [];
 
axiosInstance.interceptors.request.use(
  async config => {
    const accessToken = await localforage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
 
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {

      if (isRefreshing) {
        try {
          const accessToken = await new Promise(resolve => {
            refreshSubscribers.push((token: any) => {
              resolve(token);
            });
          });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      originalRequest._retry = true;
      isRefreshing = true;
      return new Promise(async (resolve, reject) => {
        const refreshToken = await localforage.getItem('refresh_Token');

 
        if (!refreshToken) {
          AsyncStorage.removeItem('access_token');
          AsyncStorage.removeItem('refreshToken');
          reject(new Error('Session expired. Please login again.'));
          return;
        }
 
        let dataToSend = {
          refreshToken: refreshToken,
        };

 
        axios
          .post(`${apiUrl}/auth/refresh-token`, dataToSend)
          .then(async response => {
            const {accessToken} = response.data;
            await localforage.setItem('access_Token', accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            refreshSubscribers.forEach((callback: any) =>
              callback(accessToken),
            );
            resolve(axiosInstance(originalRequest));
          })
          .catch(error => {
            // AsyncStorage.removeItem('accessToken');
            // AsyncStorage.removeItem('refreshToken');
            reject('Failed to refresh token. Please login again.');
          })
          .finally(() => {
            isRefreshing = false;
            refreshSubscribers = [];
          });
      });
    }
    return Promise.reject(error);
  },
);
 
export default axiosInstance;

