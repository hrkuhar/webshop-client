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
      return this.$store.state.showMobileMenu;
    },
    shoppingBagSummaryShown: function() {
      return this.$store.state.showShoppingBagSummary;
    }
  },
  created: function() {
    fetch("http://localhost:3000/items")
      .then(response => {
        var resText = response.text();
        console.log(resText);
        return resText;
      })
      .then(items => {
        var json = JSON.parse(items);
        json.forEach(element => {
          element.countInBag = 0;
        });
        this.$store.commit("setItems", json);
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
  font-family: 'Anton', sans-serif !important;
  margin: 0;
  font-size: 18px;
}

button{
    font-family: 'Anton', sans-serif !important;
}

body {
  height: calc(100% - 50px);
  margin: 0;
}

#main-content {
  margin-top: 50px;
  left: 0;
  width: 100%;
}

#app{
  background: url(assets/app-background-transparent.png), url(assets/app-background-transparent.png);
  background-repeat: no-repeat, no-repeat;
  background-position: -200px 60px, calc(100% + 200px) 98%;
  background-size: 400px, 400px;
  background-attachment: fixed, fixed;
  min-height: calc(100vh - 60px);
}

@media (min-width: 40rem) {
  body {
    height: calc(100% - 60px);
    margin: 0;
  }

  #main-content {
    margin-top: 60px;
  }
}
</style>
