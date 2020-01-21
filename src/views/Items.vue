<template>
  <div class="items-container">
    <div
      class="item"
      v-for="item in items"
      v-bind:key="item.id"
      v-on:click="itemClicked($event, item)"
    >
      <img :src="item.image" class="item-image" />
      <p class="item-title-container">{{item.title}}</p>
      <p class="item-price-container">{{item.price}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "items",
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
    }
  }
};
</script>

<style scoped>
.items-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  margin-left: 0;
  margin-right: 0;
  padding-top: 10px;
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

@media (min-width: 40rem) {
  .items-container {
    padding-left: 100px;
    padding-right: 100px;
    max-width: 1200px;
    margin: auto;
  }

  .item {
    width: 32%;
  }
}
</style>
