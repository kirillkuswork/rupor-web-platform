import { InternalAxiosRequestConfig } from 'axios';

export const getRequestKey = ({ method, url }: InternalAxiosRequestConfig) => `${(method || '').toUpperCase()}: ${url}`;
