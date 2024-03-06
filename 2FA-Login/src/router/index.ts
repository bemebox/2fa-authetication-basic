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

export default router
