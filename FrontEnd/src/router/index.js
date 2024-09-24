import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFound from '@/views/NotFound.vue'
import CarritoView from '@/views/CarritoView.vue'
import HomeView from '@/views/HomeView.vue'
import CategoriasView from '@/views/CategoriasView.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: CarritoView
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: CategoriasView
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
