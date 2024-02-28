const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/distritos",
        name: "distritos",
        component: () => import("../modulos/distritos/pages/IndexPage"),
      },
      {
        path: "/demarcaciones",
        name: "demarcaciones",
        component: () => import("../modulos/demarcaciones/pages/IndexPage"),
      },
      {
        path: "/municipios",
        name: "municipios",
        component: () => import("../modulos/municipios/pages/IndexPage"),
      },
      {
        path: "/partidos_politicos",
        name: "partidos_politicos",
        component: () => import("../modulos/partidosPoliticos/pages/IndexPage"),
      },
      {
        path: "/coaliciones",
        name: "coaliciones",
        component: () => import("../modulos/coaliciones/pages/IndexPage"),
      },
      {
        path: "/tipo_casillas",
        name: "tipo_casillas",
        component: () => import("../modulos/tipoCasillas/pages/IndexPage"),
      },
      {
        path: "/casillas",
        name: "casillas",
        component: () => import("../modulos/casillas/pages/IndexPage"),
      },
      {
        path: "/tipo_elecciones",
        name: "tipo_elecciones",
        component: () => import("../modulos/tipoElecciones/pages/IndexPage"),
      },
      {
        path: "/secciones",
        name: "secciones",
        component: () => import("../modulos/secciones/pages/IndexPage"),
      },
      {
        path: "/preguntasConoceles",
        name: "preguntasConoceles",
        component: () =>
          import("../modulos/preguntasConoceles/pages/IndexPage"),
      },
      {
        path: "/rubrosConoceles",
        name: "rubrosConoceles",
        component: () => import("../modulos/rubrosConoceles/pages/IndexPage"),
      },
      {
        path: "/paises",
        name: "paises",
        component: () => import("../modulos/paises/pages/IndexPage"),
      },
      {
        path: "/gruposIndigenas",
        name: "gruposIndigenas",
        component: () => import("../modulos/gruposIndigenas/pages/IndexPage"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
