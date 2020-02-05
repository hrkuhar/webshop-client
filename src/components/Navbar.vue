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
        <img
          v-on:click="mainLogoClicked"
          id="main-logo"
          alt="main logo"
          src="../assets/simple-shop-logo.png"
        />

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
        <div id="shopping-bag-icon-container">
          <img
            v-on:click="shoppingBagClicked"
            v-on:mouseover="shoppingBagMouseOver"
            v-on:mouseleave="shoppingBagMouseLeave"
            id="shopping-bag-icon"
            alt="shopping bag icon"
            src="../assets/shopping-bag.svg"
          />
          <div
            id="shopping-bag-counter"
            v-if="shoppingBagItemCount != null && shoppingBagItemCount != undefined && shoppingBagItemCount > 0"
          >{{shoppingBagItemCount}}</div>
        </div>
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
      this.$router
        .push({
          name: "items",
          params: {
            category: this.selectedCategory.toLowerCase(),
            subcategory: subcategoryNameContainer.innerHTML.toLowerCase(),
            page: "1"
          }
        })
        .catch(err => console.log(err.message));
    },
    shoppingBagClicked() {
      this.$router
        .push({
          name: "shopping-bag"
        })
        .catch(err => console.log(err.message));
    },
    shoppingBagMouseOver() {
      console.log("shopping bage mouse over");
      this.$store.commit("showShoppingBagSummary");
    },
    shoppingBagMouseLeave() {
      console.log("shopping bage mouse leave");
      this.$store.commit("hideShoppingBagSummary");
    },
    mainLogoClicked() {
      this.$router
        .push({
          name: "home"
        })
        .catch(err => console.log(err.message));
    }
  },
  computed: {
    categories: function() {
      return this.$store.getters.categories;
    },
    shoppingBagItemCount: function() {
      return this.$store.getters.shoppingBagItemCount;
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
  background-color: white;
}

#menu-icon-mobile {
  height: 40%;
}

#main-logo {
  width: 220px;
  padding-right: 40px;
  padding-bottom: 3px;
}

#shopping-bag-icon {
  height: 100%;
  padding: 5px;
}

#shopping-bag-icon-container {
  height: 100%;
  padding: 0;
  margin: 0;
  position: relative;
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
  font-weight: 500;
}

.menu-subcategory {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 0.8em;
  margin: 0 !important;
  padding-top: 6px;
  padding-bottom: 5px;
  border-bottom: 2px solid white;
  background-color: white;
  font-weight: 500;
}

.menu-category:hover {
  cursor: default;
  background-color: rgb(237, 237, 237);
}

#main-logo:hover {
  cursor: pointer;
}

.menu-subcategory:hover {
  cursor: pointer;
  border-bottom: 2px solid black;
}

#navbar-dropdown {
  position: fixed;
  top: 60px;
  left: 270px;
  width: calc(100% - 270px);
  z-index: 101;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
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

.category-active {
  background-color: rgb(237, 237, 237);
}

#shopping-bag-counter {
  background-color: red;
  color: white;
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 101;
  width: 35%;
  height: 35%;
  text-align: center;
  border-radius: 50%;
  font-size: 0.85em;
  pointer-events: none;
}

@media (min-width: 40rem) {
  #navbar {
    height: 60px;
  }

  #menu-icon-mobile {
    display: none;
  }

  #main-logo {
    width: 250px;
    padding-bottom: 5px;
  }

  .menu-categories {
    height: 100%;
  }

  .menu-category {
    display: block;
    padding-top: 10px;
  }

  #shopping-bag-icon:hover {
    cursor: pointer;
  }

  #shopping-bag-counter {
    font-size: 1em;
  }

  #shopping-bag-counter:hover {
    cursor: pointer;
  }
}
</style>
