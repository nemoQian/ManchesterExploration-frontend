import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setTimeOut from "@/router/guard/timeOut";
import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    setRouteEmitter(to);
  });
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
  setupUserLoginInfoGuard(router);
  setupPermissionGuard(router);
  setTimeOut(router);
}
