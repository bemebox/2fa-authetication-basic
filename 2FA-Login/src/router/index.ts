import { useAuthStore } from '@/stores/auth';
import DashboardView from '@/views/DashboardView.vue';
import LoginView from '@/views/LoginView.vue';
import RegistrationView from '@/views/RegistrationView.vue';
import TwoFactorAuthView from '@/views/TwoFactorAuthView.vue';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Registration',
      component: RegistrationView
    },
    {
      path: '/two-factor-auth',
      name: 'TwoFactorAuth"',
      component: TwoFactorAuthView
    }    
  ]
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  
  if (authRequired && authStore.expired()) {
    if (to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
  } else if (authStore.mfaRequired && to.path !== '/two-factor-auth') {
      next('/two-factor-auth');
  } else {
      next();
  }

})

export default router
