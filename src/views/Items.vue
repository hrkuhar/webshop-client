<template>
  <div class="container">
    <div class="items-container">
      <div
        class="item"
        v-for="item in shownItems"
        v-bind:key="item.id"
        v-on:click="itemClicked($event, item)"
      >
        <img :src="item.image" class="item-image" />
        <p class="item-title-container">{{item.title}}</p>
        <p class="item-price-container">{{item.price}}</p>
      </div>
    </div>
    <ul id="pagination-list">
      <li class="pagination-number"
        v-for="n in pagesCount"
        :key="n"
        v-on:click="goToPage(n)"
        v-bind:class="{ 'page-selected' : n == $route.params.page }"
      >{{n}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "items",
  data: function() {
    return {
      itemCountPerPage: 6
    };
  },
  methods: {
    itemClicked: function(event, item) {
      this.$router
        .push({
          name: "item-details",
          params: {
            id: item.id
          }
        })
        .catch(err => console.log(err.message));
    },
    goToPage: function(index) {
      this.$router
        .push({
          name: "items",
          params: {
            category: this.$route.params.category,
            subcategory: this.$route.params.subcategory,
            page: index
          }
        })
        .catch(err => console.log(err.message));
    }
  },
  computed: {
    items: function() {
      if (this.category != undefined && this.subCategory != undefined) {
        return this.$store.state.items.filter(
          i =>
            i.category.toLowerCase() == this.category &&
            i.subCategory.toLowerCase() == this.subCategory
        );
      } else {
        return this.$store.state.items;
      }
    },
    category: function() {
      var category = this.$route.params.category;
      if (category != undefined) {
        category = category.toLowerCase();
      }
      return category;
    },
    subCategory: function() {
      var subCategory = this.$route.params.subcategory;
      if (subCategory != undefined) {
        subCategory = subCategory.toLowerCase();
      }
      return subCategory;
    },
    pagesCount: function() {
      return Math.ceil(this.items.length / this.itemCountPerPage);
    },
    shownItems: function() {
      return this.items.slice(
        (this.$route.params.page - 1) * this.itemCountPerPage,
        this.$route.params.page * this.itemCountPerPage
      );
    }
  }
};
</script>

<style scoped>
.container {
  margin: auto;
  margin-left: 0;
  margin-right: 0;
}

.items-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  align-content: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: auto;
  margin-left: 0;
  margin-right: 0;
  padding-top: 10px;
  background-color: white;
  min-height: calc(100vh - 140px);
}

ul {
  margin: 0;
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.pagination-number{
  list-style-type: none;
  display: inline;
  font-size: 1.4em;
  font-weight: 600;
  padding: 4px;
  padding-left: 8px;
  padding-right: 8px;
  margin-left: 2px;
  margin-right: 2px;
}

.item {
  width: 47%;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 10px;
}

.item:hover {
  cursor: pointer;
  box-shadow: 0px 0px 51px -26px rgba(0, 0, 0, 0.75);
}

.item > img {
  width: 100%;
}

.item-title-container {
  margin: 0;
  margin-top: 20px;
  font-size: 0.9em;
  color: grey;
}

.item-price-container {
  margin: 0;
  font-size: 1.1em;
  background-color: black;
  color: white;
  padding: 10px;
  font-weight: 600;
  margin-top: 10px;
  text-align: center;
  border-radius: 15px;
}

.page-selected {
  color: white;
  background-color: black;
  border-radius: 10px;
}

@media (min-width: 40rem) {
  .container {
    padding-left: 200px;
    padding-right: 200px;
    margin: auto;
    background-color: transparent;
  }

  .items-container {
    margin: auto;
    background-color: transparent;
  }

  .item {
    width: 30%;
  }

  .pagination-number:hover {
  cursor: pointer;

color: white;
background-color: black;
border-radius: 10px;
}
}
</style>
