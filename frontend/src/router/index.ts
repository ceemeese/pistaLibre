import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import UserView from '@/views/UserView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUsersStore } from '@/stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
})



/*router.beforeEach((to, from, next) => {

  const store = useUsersStore();
  // ...
  // explicitly return false to cancel the navigation

  console.log(`isAuthenticated: ${store.isAuthenticated}`);
  console.log(`to: ${to.fullPath}`);
  console.log(`from: ${from.fullPath}`);

  if (to.path === '/login' || to.path === '/register') {
    next() // rutas públicas
  } else if (store.isAuthenticated) {
    next() // dejar pasar
  } else {
    next('/login') // redirigir si no está logueado
  }
})*/



export default router
