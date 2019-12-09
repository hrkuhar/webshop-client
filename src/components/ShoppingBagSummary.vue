<template>
  <div id="shopping-bag-summary-container">
    <ul class="shopping-bag-items">
      <li class="shopping-bag-item" v-for="item in shoppingBag" v-bind:key="item.name">
        <p class="item-title-container">{{ item.title }} {{ item.countInBag }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ShoppingBagSummary",
  methods: {},
  computed: {
    shoppingBag: function() {
      return this.$store.getters.shoppingBag;
    }
  }
};
</script>

<style scoped>
#shopping-bag-summary-container {
  display: none;
}
@media (min-width: 40rem) {
  #shopping-bag-summary-container {
    display: block;
    position: fixed;
    top: 60px;
    right: 0;
    background-color: lightgray;
    padding-right: 40px;
  }
}
</style>
