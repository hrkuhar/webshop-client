import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Items from "../views/Items.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/items/:category/:subcategory",
    name: "items",
    component: Items
  },
  {
    path: "/items",
    name: "items-all",
    component: Items
  }
];

const router = new VueRouter({
  routes
});

export default router;
