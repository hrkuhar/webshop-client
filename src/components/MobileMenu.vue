<template>
  <div id="mobile-menu-overlay" v-on:click.self="hideMobileMenu">
    <transition name="slide" mode="out-in">
      <div id="mobile-menu" v-if="showMenu">
        <div id="mobile-menu-logo-container">
          <img id="main-logo" alt="main logo" src="../assets/simple-shop-logo.png" />
          <img
            id="mobile-menu-close-button"
            alt="close button"
            src="../assets/close-button.svg"
            v-on:click="hideMobileMenu"
          />
        </div>

        <div class="menu-category" v-for="category in categories" v-bind:key="category.name">
          <div class="category-container" v-on:click="toggleSubCategories($event)">
            <p>{{ category.name.toUpperCase() }}</p>
            <img alt="down arrow" src="../assets/arrow-down.svg" />
          </div>
          <div
            class="menu-subcategory"
            v-for="subCategory in category.subCategories"
            v-bind:key="subCategory.name"
            v-on:click="menuSubCategoryClicked($event)"
          >
            <p>{{ subCategory.name }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MobileMenu",
  data: function() {
    return {
      showMenu: false
    };
  },
  methods: {
    hideMobileMenu() {
      this.showMenu = false;
      setTimeout(() => {
        this.$store.commit("hideMobileMenu");
      }, 1000);
    },
    toggleSubCategories(event) {
      console.log(event.target);

      var menuCategory = event.target;
      while (menuCategory.className != "menu-category") {
        menuCategory = menuCategory.parentElement;
      }
      var children = menuCategory.children;
      for (var child of children) {
        if (child.className == "menu-subcategory") {
          child.style.display =
            child.style.display == "block" ? "none" : "block";
        }
      }
    },
    menuSubCategoryClicked(event) {
      var element = event.target;
      while (element.className != "menu-subcategory") {
        element = element.parentElement;
      }

      var categoryLink = element.parentElement.children[0].children[0].innerHTML.toLowerCase();
      var subcategoryLink = element.children[0].innerHTML.toLowerCase();

      this.$router
        .push({
          name: "items",
          params: {
            category: categoryLink,
            subcategory: subcategoryLink,
            page: "1"
          }
        })
        .catch(err => console.log(err.message));

      this.hideMobileMenu();
    }
  },
  computed: {
    categories: function() {
      return this.$store.getters.categories;
    }
  },
  mounted: function() {
    this.showMenu = true;
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
  width: 180px;
  margin-left: -5px;
  padding-bottom: 3px;
}

#mobile-menu-close-button {
  height: 30%;
}

.category-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 25px;
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

.slide-enter-active,
.slide-leave-active {
  transition: 1s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(-100%, 0);
}
</style>
