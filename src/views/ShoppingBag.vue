<template>
  <div id="shopping-bag-container">
    <div v-if="shoppingBagIsEmpty" id="empty-message-container">
      <img id="icon-bag-empty" alt="shopping bag empty" src="../assets/shopping-bag-empty.png" />
      <p>YOUR SHOPPING BAG IS EMPTY</p>
    </div>
    <div class="shopping-bag-item" v-for="item in shoppingBag" v-bind:key="item.name">
      <img class="item-image" :src="item.image" />
      <div class="item-data-container">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-count-price">{{ item.countInBag }}x {{ item.price }}</div>
        <button class="remove-from-bag-button" v-on:click="removeFromBag(item.id)">Remove from bag</button>
      </div>
    </div>
    <div id="footer">
      <div id="shopping-bag-total">TOTAL: {{this.shoppingBagTotalPrice}}</div>
      <button
        id="checkout-button"
        :disabled="shoppingBagIsEmpty"
        v-on:click="checkoutClicked"
      >CHECKOUT</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingBag",
  methods: {
    removeFromBag: function(id) {
      this.$store.commit("removeFromBag", id);
    },
    checkoutClicked: function() {
      this.$router
        .push({
          name: "checkout"
        })
        .catch(err => console.log(err.message));
    }
  },
  computed: {
    shoppingBag: function() {
      return this.$store.getters.shoppingBag;
    },
    shoppingBagTotalPrice: function() {
      return this.$store.getters.shoppingBagTotalPrice;
    },
    shoppingBagIsEmpty: function() {
      return this.$store.getters.shoppingBagIsEmpty;
    }
  }
};
</script>

<style scoped>
#shopping-bag-container {
  display: block;
  background-color: white;
  padding-right: 0;
  margin: 0;
  padding-bottom: 120px;
}

.shopping-bag-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.item-data-container {
  width: 100%;
  text-align: center;
}

.item-image {
  height: 200px;
}

.item-title {
  font-size: 1.2em;
  color: grey;
  margin-bottom: 10px;
}

.remove-from-bag-button {
  width: 60%;
  margin: auto;
  display: block;
  height: 30px;
  color: white;
  background-color: black;
  border: 0;
  font-size: 1.1em;
  font-weight: 600;
  margin-top: 10px;
  min-width: 180px;
}

#shopping-bag-total {
  display: block;
  margin:auto;
  font-weight: 600;
  color: white;
  background-color: red;
  text-align: center;
  margin-top: 20px;
  height: 50px;
  width: 96%;
  padding-top: 15px;
}

#checkout-button {
  width: 96%;
  margin: auto;
  display: block;
  height: 50px;
  color: white;
  background-color: black;
  border: 0;
  font-size: 1.1em;
  font-weight: 600;
  margin-top: 5px;
}

#checkout-button:disabled {
  color: grey;
}

#checkout-button:focus,
.remove-from-bag-button:focus {
  outline: none;
  border: none;
}

#footer {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  padding-bottom: 10px;
}

#empty-message-container {
  text-align: center;
  font-size: 1.1em;
  font-weight: 600;
}

#icon-bag-empty {
  margin-top: 150px;
  width: 150px;
  margin-bottom: 40px;
}

@media (min-width: 40rem) {
  #shopping-bag-container, #footer {
    padding-left: 200px;
    padding-right: 200px;
    margin: auto;
  }

  .item-image {
    height: 300px;
  }

  .remove-from-bag-button {
    width: 40%;
    height: 40px;
  }

  .remove-from-bag-button:hover {
    cursor: pointer;
  }

  #checkout-button:hover {
    cursor: pointer;
  }

  #empty-message-container {
    margin-top: 0;
  }

  #icon-bag-empty {
    margin-top: 100px;
    width: 200px;
  }
}
</style>
