<template>
  <div>
    <div id="navbar">
      <div id="navbar-items-left">
        <img
          id="menu-icon-mobile"
          alt="mobile menu icon"
          src="../assets/icon-menu-mobile.png"
          v-on:click="showMobileMenu"
        />
        <img id="main-logo" alt="main logo" src="../assets/main-logo.svg" />

        <div
          class="menu-category"
          v-for="category in categories"
          v-bind:key="category.name"
          v-on:mouseover="menuCategoryMouseover($event)"
          v-on:mouseleave="menuCategoryMouseleave"
        >
          <p class="category-name-container">{{ category.name.toUpperCase() }}</p>
        </div>
      </div>
      <div id="navbar-items-right"></div>
    </div>

    <div id="navbar-dropdown" v-if="showNavbarDropdown">
        
        <div
        class="menu-subcategory"
          v-for="subcategory in dropdownSubcategories"
          v-bind:key="subcategory.name"
        >
          <p>{{subcategory.name.toUpperCase()}}</p>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function() {
    return {
      showNavbarDropdown: false,
      navbarDropdownCategory: "",
      dropdownSubcategories : []
    };
  },
  methods: {
    showMobileMenu() {
      this.$store.commit("showMobileMenu");
    },
    menuCategoryMouseover(event) {

        console.log(event.target);
        var categoryNameContainer = event.target;
        while(categoryNameContainer.className != "category-name-container"){
            categoryNameContainer = categoryNameContainer.children[0];
        }
        console.log(categoryNameContainer.innerHTML);
      this.showNavbarDropdown = true;
      this.dropdownSubcategories = this.$store.getters.categories.filter(c => c.name.toLowerCase() == categoryNameContainer.innerHTML.toLowerCase())[0].subCategories;
    },
    menuCategoryMouseleave() {

      if(document.getElementById("navbar-dropdown").matches(":hover")){
        return;
      }
      this.showNavbarDropdown = false;
      this.dropdownSubcategories = [];
    }
  },
  computed: {
    categories: function() {
      return this.$store.getters.categories;
    },
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
  z-index: 101;
}

#menu-icon-mobile {
  height: 40%;
}

#main-logo {
  height: 20%;
  padding-right: 60px;
  padding-left: 5px;
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

#navbar-items-left > * {
  margin: 5px;
}

.menu-category {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 0.8em;
  margin: 0 !important;
  display: none;
    height: 100%;
}

.menu-subcategory {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 0.8em;
  margin: 0 !important;
}

.menu-category:hover {
  background-color: lightgray;
  cursor: pointer;
}

#navbar-dropdown {
  position: fixed;
  top: 50px;
  left: 0;
  min-width: 60%;
  background-color: lightgray;
  z-index: 101;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 255px;
}

@media (min-width: 40rem) {
  #navbar {
    height: 50px;
  }

  #menu-icon-mobile {
    display: none;
  }

  #main-logo {
    height: 35%;
    padding-left: 20px;
  }

  .menu-category {
  display: block;
}
}
</style>
