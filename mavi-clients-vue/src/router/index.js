import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginComponent.vue';
import Dashboard from '../components/DashboardComponent.vue'; // Página protegida
import Clients from '../components/ClientsView.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/clients', component: Clients },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login'); // Redirige al login si no está autenticado
  } else {
    next();
  }
});

export default router;
