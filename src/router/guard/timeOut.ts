import NProgress from 'nprogress';
import type { Router } from "vue-router";

export default function setTimeOut(router: Router) {
  router.beforeEach((to, from, next) => {
    const timeoutId = setTimeout(() => {
      NProgress.done();
      alert('操作超时，请重试！');
      if (to.name !== 'login') { // 检查当前页面是否已经是登录页面
        router.push({ name: 'login' }); // 重定向到登录页面
      }
      clearTimeout(timeoutId);
    }, 5000);
    next();
    router.afterEach(() => {
      clearTimeout(timeoutId); // 清除超时定时器
      NProgress.done();
    });
  });
}
