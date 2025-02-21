import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Items from "../views/Items.vue";
import ItemDetails from "../views/ItemDetails.vue";
import ShoppingBag from "../views/ShoppingBag.vue";
import Checkout from "../views/Checkout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/items/:category/:subcategory/:page",
    name: "items",
    component: Items
  },
  {
    path: "/items",
    name: "items-all",
    component: Items
  },
  {
    path: "/item/:id",
    name: "item-details",
    component: ItemDetails
  },
  {
    path: "/shoppingbag",
    name: "shopping-bag",
    component: ShoppingBag
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout
  }
];

const router = new VueRouter({
  routes
});

export default router;
