import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const TAGLIST: AppRouteRecordRaw = {
  path: '/tagList',
  name: 'TagList',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.tag',
    requiresAuth: true,
    icon: 'icon-tags',
    order: 11,
  },
  children: [
    {
      path: 'addTag',
      name: 'AddTag',
      component: () => import('@/views/tag_manage_list/index.vue'),
      meta: {
        locale: 'menu.tag.create',
        requiresAuth: true,
        roles: [-1],
      },
    },
    {
      path: 'listTag',
      name: 'ListTag',
      component: () => import('@/views/tag_add_list/index.vue'),
      meta: {
        locale: 'menu.tag.list',
        requiresAuth: true,
        roles: [-1],
      },
    },
  ],
};

export default TAGLIST;
