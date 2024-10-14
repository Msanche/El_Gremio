import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFound from '@/views/NotFound.vue'
import CarritoView from '@/views/CarritoView.vue'
import HomeView from '@/views/HomeView.vue'
import CategoriasView from '@/views/CategoriasView.vue'
import UsuarioVendedorView from '@/views/UsuarioVendedorView.vue'
import UsuarioClienteView from '@/views/UsuarioClienteView.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }

  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true }

  },
  {
    path: '/carrito',
    name: 'carrito',
    component: CarritoView,
    meta: { requiresAuth: true }

  },
  {
    path: '/categorias',
    name: 'categorias',
    component: CategoriasView,
    meta: { requiresAuth: true }

  },
  {
    path: '/Vendedor',
    name: 'Vendedor',
    component: UsuarioVendedorView,
    meta: { requiresAuth: true, role: 'Vendedor' }

  },
  {
    path: '/Cliente',
    name: 'Cliente',
    component: UsuarioClienteView,
    meta: { requiresAuth: true, role: 'Cliente' }

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
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Verifica si el usuario está autenticado
  const role = localStorage.getItem('role'); // Suponiendo que tienes la información del usuario

  // Verifica si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      // Redirige al login si no hay token
      return next('/');
    }
    
    // Verifica si la ruta tiene un rol específico
    if (to.meta.role) {
      // Compara el rol del usuario con el requerido por la ruta
      if (role && role === to.meta.role) {
        return next(); // Si coincide, permite el acceso
      } else {
        return next('/unauthorized'); // Redirige si el rol no coincide
      }
    }
    
    // Si no hay roles específicos, permite el acceso si está autenticado
    return next();
  } else {
    // Permite el acceso si no requiere autenticación
    return next();
  }
});


export default router
