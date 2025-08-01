import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Login from '../views/Login.vue'
import DashboardView from '../views/DashboardView.vue'
import TambahProduk from '../views/products/TambahProduk.vue'
import DaftarProduk from '../views/products/DaftarProduk.vue'

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
  {
    path: '/dashboard/tambah-produk',
    name: 'Tambah Produk',
    component: TambahProduk,
    meta: { layout: 'app', requiresAuth: true }
  },
  {
    path: '/dashboard/daftar-produk',
    name: 'Daftar Produk',
    component: DaftarProduk,
    meta: { layout: 'app', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Atur tampilan progress bar
NProgress.configure({ showSpinner: false })

// ✅ Gabungkan auth + progress bar
router.beforeEach((to, from, next) => {
  NProgress.start()

  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'LoginPage', query: { forced: 'true' } })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
