import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Inicio",
      component: () => import("@/views/Inicio.vue"),
    },
    {
      path: "/establecimiento/:id",
      name: "DetalleEstablecimiento",
      component: () => import("@/views/DetalleEstablecimiento.vue"),
    },
    {
      path: "/registro",
      name: "Registro",
      component: () => import("@/views/Registro.vue"),
      beforeEnter: (to, from) => {
        const token = localStorage.getItem('accessToken')

        if (token) {
          return '/admin/panel'
        }

      }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
      beforeEnter: (to, from) => {
        const token = localStorage.getItem('accessToken')

        if (token) {
          return '/admin/panel'
        }

      }
    },

    {
      path: "/admin",
      name: "Admin",
      component: () => import("@/views/admin/Admin.vue"),
      children: [
        {
          path: "panel",
          name: "Panel",
          component: () => import("@/views/admin/Panel.vue")
        },
        {
          path: "establecimiento/crear",
          name: "CrearEstablecimiento",
          component: () => import("@/views/admin/Formulario.vue"),
        },
        {
          path: "establecimiento/:id/editar",
          name: "EditarEstablecimiento",
          component: () => import("@/views/admin/Formulario.vue"),
        },
      ],
      beforeEnter: (to, from) => {
        const token = localStorage.getItem('accessToken')
        const usuario = localStorage.getItem('usuario')

        if (!token || !usuario) {
          return '/login'
        }

      }

    },
  ],
});

export default router;
