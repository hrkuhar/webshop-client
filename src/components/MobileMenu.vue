<template>
  <div id="mobile-menu-overlay" v-on:click.self="hideMobileMenu">
    <div id="mobile-menu">
      <div id="mobile-menu-logo-container">
        <img id="main-logo" alt="main logo" src="../assets/main-logo.svg" />
        <img
          id="mobile-menu-close-button"
          alt="close button"
          src="../assets/close-button.svg"
          v-on:click="hideMobileMenu"
        />
      </div>

      <div
        class="menu-category"
        v-for="category in categories"
        v-bind:key="category.name"
      >
        <div class="category-container" v-on:click ="toggleSubCategories($event)"> 
          <p>{{ category.name.toUpperCase() }}</p>
          <img alt="down arrow" src="../assets/arrow-down.svg" />
        </div>
        <div
          class="menu-subcategory"
          v-for="subCategory in category.subCategories"
          v-bind:key="subCategory.name"
        >
          <p>{{ subCategory.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileMenu",
  methods: {
    hideMobileMenu() {
      this.$store.commit("hideMobileMenu");
    },
    toggleSubCategories(event) {
        console.log(event.target);

        var menuCategory = event.target;
        while(menuCategory.className != "menu-category"){
            menuCategory = menuCategory.parentElement;
        }
      var children = menuCategory.children;
      for (var child of children) {
        if (child.className == "menu-subcategory") {
          child.style.display = child.style.display == "block" ? "none" : "block";
        }
      }
    }
  },
  computed: {
    categories: function() {
      return this.$store.getters.categories;
    }
  }
};
</script>

<style scoped>
#mobile-menu-overlay {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
}

#mobile-menu {
  height: 100%;
  width: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

#mobile-menu-logo-container {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}

#main-logo {
  height: 20%;
}

#mobile-menu-close-button {
  height: 30%;
}

.category-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  height: 50px;
}

.menu-subcategory {
    display: none;
    padding-left: 40px;
}

.menu-category {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.category-container img {
  height: 30%;
}
</style>
