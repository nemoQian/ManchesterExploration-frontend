import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const TAGLIST: AppRouteRecordRaw = {
  path: '/tags',
  name: 'tags',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    hideInMenu: true,
  },
  children: [
    {
      path: 'user-list',
      name: 'user-list',
      component: () => import('@/views/user_tag_list/index.vue'),
      meta: {
        requiresAuth: true,
        roles: [-1],
        hideInMenu: true,
      },
    },
  ],
};

export default TAGLIST;
