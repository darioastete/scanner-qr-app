import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("./views/ScanView.vue"),
    name: "ScanView",
  },
  {
    path: "/qrlistadmin",
    component: () => import("./views/QrListView.vue"),
    name: "QrListView",
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
