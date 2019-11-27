<template>
  <div class="items-container">
    <div class="item" v-for="item in items" v-bind:key="item.id">
      <img :src="item.image">
    </div>
  </div>
</template>

<script>
export default {
  name: "items",
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
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
}

.item {
  height: 400px;
  width: 300px;
  background-color: lightgray;
  margin: 5px;
}

.item > img{
  height: 80%;
  width: 100%;
}
</style>
