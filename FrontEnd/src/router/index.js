import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/:catchAll(.*)',  // Ruta para manejar 404
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),  // Cambiado a createWebHistory
  routes
})

export default router
