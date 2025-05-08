import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUsersStore } from '@/stores/userStore';
import { useReservationsStore } from '@/stores/reservationStore'
import { useCourtsStore } from '@/stores/courtStore'

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
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/courts',
      name: 'courts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CourtsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id/reservations',
      name: 'reservations',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReservationsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register/:type',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
})


router.beforeEach((to, from, next) => {

  const store = useUsersStore();
  
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next({ name: 'login' });  
  } else if (to.meta.requiresAdmin && (!store.isAuthenticated || !store.isAdmin)){
    next({name: 'user'});
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const reservationStore = useReservationsStore()
  const userStore = useUsersStore()
  const courtStore = useCourtsStore()

  if (!reservationStore.isLoaded) {
    await reservationStore.fetchAll()
    console.log('Dato cargado del BeforeEach');
  }
  if (!userStore.isLoaded) {
    await userStore.fetchAll()
  }
  if (!courtStore.isLoaded) {
    await courtStore.fetchAll()
  }

  next()
})


export default router
