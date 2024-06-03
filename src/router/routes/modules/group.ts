import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const GROUPLIST: AppRouteRecordRaw = {
  path: '/groupList',
  name: 'groupList',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.group',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 10,
  },
  children: [
    {
      path: 'addGroup',
      name: 'AddGroup',
      component: () => import('@/views/group_add/index.vue'),
      meta: {
        locale: 'menu.group.create',
        requiresAuth: true,
        roles: [-1],
      },
    },
    {
      path: 'listGroup',
      name: 'ListGroup',
      component: () => import('@/views/group_list/index.vue'),
      meta: {
        locale: 'menu.group.list',
        requiresAuth: true,
        roles: [-1],
      },
    },
    {
      path: 'searchGroup',
      name: 'SearchGroup',
      component: () => import('@/views/group_list/search-index.vue'),
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
};

export default GROUPLIST;
