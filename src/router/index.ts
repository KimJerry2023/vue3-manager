import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { usePermissStore } from '@/stores/permiss'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Home from '@/views/homePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/loginPage.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
          permiss: '1'
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboardPage.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const role = localStorage.getItem('ms_username');
  const permiss = usePermissStore();
  if (!role && to.path !== '/login') {
      next('/login');
  } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
      // 如果没有权限，则进入403
      next('/403');
  } else {
      next();
  }
});

router.afterEach(() => {
  NProgress.done()
})

export default router
