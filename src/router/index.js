import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: () => import('@/views/Inicio.vue'),
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/admin/Admin.vue'),
      children:[
        {
          path: 'establecimiento/crear',
          name: 'CrearEstablecimiento',
          component: () => import('@/views/admin/Formulario.vue'),
        }
      ]
    }
  ],
})

export default router
