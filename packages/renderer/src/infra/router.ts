import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";

export const routes = [
  // {
  //   path: "/",
  //   name: "/:script/:bid?/:oid?",
  //   // name: "/fap",
  //   //  This is the only page that is NOT lazy-loaded,
  //   //  and that's why 'component: Wizard' statement looks different from others, below.
  //   component: Wizard,
  // },
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/takeoff",
    name: "TakeoffView",
    component: () => import("../views/TakeoffView.vue")
  },
  {
    path: "/price-book",
    name: "PriceBookView",
    component: () => import("../views/PriceBookView.vue")
  },
  // {
  //   path: "/proto-two",
  //   name: "proto-two",
  //   component: AGGrid
  // },
  // {
  //   path: "/proto-three",
  //   name: "proto-three",
  //   component: HandsontableView
  // },
  // {
  //   path: "/FilePickers",
  //   name: "FilePickers",
  //   component: () => import("../infra/components/dynamic/FilePickers.vue"),
  // },
  // {
  //   path: "/VehicleAssetDataTables",
  //   name: "VehicleAssetDataTables",
  //   component: () => import("./components/dynamic/VehicleAssetDataTable.vue"),
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/NotFound.vue")
  }
];

const router = createRouter({
  //
  history: createWebHistory(/*import.meta.env.BASE_URL*/),
  routes
});

export default router;
