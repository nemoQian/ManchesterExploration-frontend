import { AppRouteRecordRaw } from '../types';

const MAP: AppRouteRecordRaw = {
  path: '/map',
  name: 'map',
  component: () => import('@/views/map/index.vue'),
  meta: {
    requiresAuth: false,
  },
};

export default MAP;
