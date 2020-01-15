<template>
  <div id="shopping-bag-summary-container" v-if="shoppingBag.length > 0">
    <div class="shopping-bag-item" v-for="item in shoppingBag" v-bind:key="item.name">
      <img class="item-image" :src="item.image" />
      <div class="item-title">{{ item.title }}</div>
      <div class="item-count">{{ item.countInBag }}x</div>
    </div>
    <div id="shopping-bag-total">TOTAL: {{this.shoppingBagTotalPrice}}</div>
  </div>
</template>

<script>
export default {
  name: "ShoppingBagSummary",
  methods: {},
  computed: {
    shoppingBag: function() {
      return this.$store.getters.shoppingBag;
    },
    shoppingBagTotalPrice: function() {
      return this.$store.getters.shoppingBagTotalPrice;
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
    background-color: white;
    padding-right: 0;
    padding-left: 4px;
    padding-bottom: 4px;
    margin: 0;
    z-index: 101;
  }

  .shopping-bag-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .item-image {
    height: 100px;
    margin-right: 20px;
  }

  .item-title {
    margin-right: 20px;
    font-size: 0.9em;
    color: grey;
  }

  .item-count {
    margin-right: 20px;
  }

  #shopping-bag-total {
    padding: 20px;
    font-weight: 600;
    color: white;
    background-color: black;
    text-align: center;
  }
}
</style>
