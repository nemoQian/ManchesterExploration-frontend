import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
  RegisterData,
  register,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: undefined,
    id: -1,
    username: '',
    nickname: undefined,
    gender: undefined,
    avatar: undefined,
    phone: undefined,
    email: undefined,
    createTime: undefined,
    userRole: -1,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        resolve(this.userRole);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      this.setInfo(res.data);
      await this.switchRoles();
    },

    // Login
    async login(loginForm: LoginData) {
      console.log(loginForm);
      try {
        const res = await userLogin(loginForm);
        // setToken(res.data.token);
        console.log(res);
        setToken('token');
      } catch (err) {
        clearToken();
        console.log(err);
        throw err;
      }
    },

    // Register
    async register(registerForm: RegisterData) {
      console.log(registerForm);
      try {
        const res = await register(registerForm);
        console.log(res);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
        clearToken();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
