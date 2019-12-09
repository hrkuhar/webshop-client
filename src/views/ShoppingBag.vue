<template>
   <div id="shopping-bag-container">
    <ul class="shopping-bag-items">
      <li class="shopping-bag-item" v-for="item in shoppingBag" v-bind:key="item.name">
        <p class="item-title-container">{{ item.title }} {{ item.countInBag }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ShoppingBag",
  methods: {
    
  },
  computed: {
    shoppingBag: function() {
      return this.$store.getters.shoppingBag;
    }
  }
};
</script>

<style scoped>

</style>
