import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'blank' }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: Login,
    meta: { layout: 'blank' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { layout: 'app', requiresAuth: true }
  },
  // Nanti tambahkan rute login, dll
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'LoginPage', query: { forced: 'true' } });
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router
