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
    avatarUrl: undefined,
    phone: undefined,
    email: undefined,
    createTime: '',
    updateTime: '',
    tags: [],
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
      this.createTime = this.formatDate(this.createTime);
      this.updateTime = this.formatDate(this.updateTime);
      this.setGender(res.data.gender);
      if (res.data.tags !== null) {
        this.tags = JSON.parse(res.data.tags.toString());
      }
      await this.switchRoles();
      console.log(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        // setToken(res.data.token);
        setToken('token');
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Register
    async register(registerForm: RegisterData) {
      console.log(registerForm);
      try {
        const res = await register(registerForm);
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

    formatDate(dateString: string) {
      return new Date(dateString).toLocaleDateString('en-UK');
    },

    setGender(gender: number | undefined | string) {
      if (gender === 1) {
        this.gender = 'Male';
      } else if (gender === 0) {
        this.gender = 'Female';
      } else this.gender = '';
    },
  },
});

export default useUserStore;
