<template>
  <div id="app">
    <Navbar></Navbar>
    <MobileMenu v-if="mobileMenuShown"></MobileMenu>
    <ShoppingBagSummary v-if="shoppingBagSummaryShown"></ShoppingBagSummary>
    <div id="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MobileMenu from "@/components/MobileMenu.vue";
import ShoppingBagSummary from "@/components/ShoppingBagSummary.vue";


export default {
  name: "App",
  components: {
    Navbar,
    MobileMenu,
    ShoppingBagSummary
  },
  computed: {
    mobileMenuShown: function() {
      return this.$store.state.mobileMenuShown;
    },
    shoppingBagSummaryShown: function() {
      return this.$store.state.shoppingBagSummaryShown;
    }
  },
  created: function() {
    fetch("http://localhost:3000/items")
      .then(response => {
        return response.text();
      })
      .then(items => {
        var json = JSON.parse(items);
        json.forEach(element => {
          element.countInBag = 0;
        });
        this.$store.commit("setItems", json);
        console.log(this.$store.getters.categories);
      });
  }
};
</script>

<style>
* {
  box-sizing: border-box !important;
}

html {
  height: 100%;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

body {
  height: 100%;
  margin: 0;
}

#main-content {
  margin-top: 50px;
  left: 0;
  width: 100%;
}

@media (min-width: 40rem) {
  #main-content{
    margin-top: 60px;
  }
}
</style>
