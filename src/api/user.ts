import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  userPassword: string;
}

export interface RegisterData {
  username: string;
  userPassword: string;
  checkPassword: string;
}

export interface LoginRes {
  token: string;
  id: -1;
  username: '';
  nickname: undefined;
  gender: undefined;
  avatar: undefined;
  phone: undefined;
  email: undefined;
  createTime: undefined;
  userRole: -1;
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

export function register(data: RegisterData) {
  return axios.post<string>('/api/user/register', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/userInfo');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
