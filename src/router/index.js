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
    },

    {
      path: "/admin",
      name: "Admin",
      component: () => import("@/views/admin/Admin.vue"),
      children: [
        {
          path: "establecimiento/crear",
          name: "CrearEstablecimiento",
          component: () => import("@/views/admin/Formulario.vue"),
        },
      ],
    },
  ],
});

export default router;
