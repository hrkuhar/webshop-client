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

        <ul class="menu-categories" v-on:mouseleave="menuCategoryMouseleave">
          <li
            class="menu-category"
            v-for="category in categories"
            v-bind:key="category.name"
            v-on:mouseover="menuCategoryMouseover($event)"
            v-bind:class="[category.name.toLowerCase() == selectedCategory.toLowerCase() ? 'category-active' : '']"
          >
            <p class="category-name-container">{{ category.name.toUpperCase() }}</p>
          </li>
        </ul>

        <!-- <div class="menu-category">
          <router-link to="/items">Go to Items</router-link>
        </div>

        <div class="menu-category">
          <router-link to="/">Go to Home</router-link>
        </div>-->
      </div>
      <div id="navbar-items-right">
        <img id="shopping-bag-icon" alt="shopping bag icon" src="../assets/shopping-bag.svg" />
      </div>
    </div>

    <div id="navbar-dropdown" v-if="showNavbarDropdown" v-on:mouseleave="menuCategoryMouseleave">
      <div
        class="menu-subcategory"
        v-for="subcategory in dropdownSubcategories"
        v-bind:key="subcategory.name"
        v-on:click="menuSubCategoryClicked($event)"

      >
        <p class="subcategory-name-container">{{ subcategory.name }}</p>
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
      dropdownSubcategories: [],
      selectedCategory: ""
    };
  },
  methods: {
    showMobileMenu() {
      this.$store.commit("showMobileMenu");
    },
    menuCategoryMouseover(event) {
      console.log(event.target);
      var categoryNameContainer = event.target;
      while (categoryNameContainer.className != "category-name-container") {
        categoryNameContainer = categoryNameContainer.children[0];
      }
      console.log(categoryNameContainer.innerHTML);
      this.showNavbarDropdown = true;
      this.dropdownSubcategories = this.$store.getters.categories.filter(
        c =>
          c.name.toLowerCase() == categoryNameContainer.innerHTML.toLowerCase()
      )[0].subCategories;
      this.selectedCategory = categoryNameContainer.innerHTML;
    },
    menuCategoryMouseleave() {
      if (document.getElementById("navbar-dropdown").matches(":hover")) {
        return;
      }
      this.showNavbarDropdown = false;
      this.dropdownSubcategories = [];
      this.selectedCategory = "";
    },
    menuSubCategoryClicked(event) {
      var subcategoryNameContainer = event.target;
      while (
        subcategoryNameContainer.className != "subcategory-name-container"
      ) {
        subcategoryNameContainer = subcategoryNameContainer.children[0];
      }
      this.$router.push({
        name: "items",
        params: {
          category: this.selectedCategory.toLowerCase(),
          subcategory: subcategoryNameContainer.innerHTML.toLowerCase()
        }
      }).catch(err => console.log(err.message));
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

#shopping-bag-icon {
  height: 90%;
  padding-right: 5px;
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
  padding-top: 5px;
  padding-bottom: 5px;
}

.menu-category:hover {
  cursor: default;
  background-color: rgb(237, 237, 237);
}

.menu-subcategory:hover {
  cursor: pointer;
  border-bottom: 1px solid black;
}

#navbar-dropdown {
  position: fixed;
  top: 50px;
  left: 259px;
  width: calc(100% - 259px);
  z-index: 101;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
}

.menu-categories {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
}

.category-active{
  background-color: rgb(237, 237, 237);
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

  .menu-categories {
    height: 100%;
  }

  .menu-category {
    display: block;
    padding-top: 5px;
  }
}
</style>
