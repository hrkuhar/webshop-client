<template>
  <div class="items">
    <ul>
      <li
        v-for="item in items"
        v-bind:key="item.id"
      >{{ item.description }} {{ item.category }} {{ item.subCategory }}</li>
    </ul>
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

<style scoped></style>
