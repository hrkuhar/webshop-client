<template>
  <div id="navbar">
    <div id="navbar-items-left">
      <img
        id="menu-icon-mobile"
        alt="mobile menu icon"
        src="../assets/icon-menu-mobile.png"
        v-on:click="showMobileMenu"
      />
      <img id="main-logo" alt="main logo" src="../assets/main-logo.svg" />
    </div>
    <div id="navbar-items-right"></div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods : {
      showMobileMenu() {
          this.$store.commit('showMobileMenu');
      }
  }
};
</script>

<style scoped>
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#menu-icon-mobile {
  height: 40%;
}

#main-logo {
  height: 20%;
}

#navbar-items-left {
  height: 100%;
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#navbar-items-right {
  height: 100%;
  background-color: rebeccapurple;
  margin-right: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

#navbar-items-left > *{
    margin: 5px;
}

@media (min-width: 40rem) {
  #navbar {
    height: 50px;
  }

  #menu-icon-mobile {
    display: none;
  }
}
</style>
