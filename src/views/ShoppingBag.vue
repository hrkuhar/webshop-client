<template>
  <div id="shopping-bag-container">
    <div v-if="shoppingBagIsEmpty" id="empty-message-container">
      <img id="icon-bag-empty" alt="shopping bag empty" src="../assets/shopping-bag.svg" />
      <p>YOUR SHOPPING BAG IS EMPTY</p>
    </div>
    <div class="shopping-bag-item" v-for="item in shoppingBag" v-bind:key="item.name">
      <img class="item-image" :src="item.image" />
      <div class="item-data-container">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-count-price">{{ item.countInBag }}x {{ item.price }}</div>
        <button class="remove-from-bag-button" v-on:click="removeFromBag(item.id)">REMOVE</button>
      </div>
    </div>
    <div id="bottom-items-container">
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  flex-wrap: wrap;

  background-color: white;
  padding-right: 0;
  margin: 0;
  padding: 10px;
  padding-top: 20px;
  min-height: calc(100vh - 50px);
}

.shopping-bag-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.item-data-container {
  width: 100%;
  text-align: center;
}

.item-image {
  height: 180px;
}

.item-title {
  font-size: 1.2em;
  color: grey;
  margin-bottom: 20px;
}

.remove-from-bag-button {
  margin: auto;
  display: block;
  height: 30px;
  color: white;
  background-color: black;
  border: 0;
  font-size: 1.1em;
  margin-top: 10px;
  border-radius: 5px;
     padding-left: 20px;
    padding-right: 20px;
}

#bottom-items-container{
  width: 100%;
}

#shopping-bag-total {
  display: block;
  margin: auto;
  color: white;
  background-color: red;
  text-align: center;
  margin-top: 20px;
  height: 50px;
  width: 100%;
  line-height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
}

#checkout-button {
  width: 100%;
  margin: auto;
  display: block;
  height: 50px;
  color: white;
  background-color: black;
  border: 0;
  font-size: 1.1em;
  margin-top: 5px;
  border-radius: 5px;
}

#checkout-button:disabled {
  background-color: gray;
}

#checkout-button:focus,
.remove-from-bag-button:focus {
  outline: none;
  border: none;
}

#empty-message-container {
  text-align: center;
  font-size: 1.1em;
}

#icon-bag-empty {
  width: 150px;
  padding-bottom: 20px;
  padding-top: 40%;
}

@media (min-width: 40rem) {
  #shopping-bag-container {
    padding-left: 280px;
    padding-right: 280px;
    margin: auto;
    background-color: transparent;
      min-height: calc(100vh - 60px);
  }

  .item-image {
    height: 300px;
  }

  .remove-from-bag-button {
    height: 40px;
    border-radius: 8px;
    width: auto;
 
    transition: all 0.4s ease 0s;
  }

  .remove-from-bag-button:hover {
    cursor: pointer;
    background-color: red;
    letter-spacing: 3px;
    transition: all 0.4s ease 0s;
  }

  #checkout-button:hover {
    cursor: pointer;
  }

  #empty-message-container {
    margin-top: 0;
  }

  #icon-bag-empty {
    width: 200px;
  }

  #checkout-button {
    width: auto;
    padding-left: 20px;
    padding-right: 20px;
    transition: all 0.4s ease 0s;
  }

  #checkout-button:hover {
    cursor: pointer;

    background-color: green;
    letter-spacing: 3px;
    transition: all 0.4s ease 0s;
  }

  #checkout-button:disabled {
    background-color: black;
  }

  #checkout-button:disabled:hover {
    cursor: pointer;

    background-color: gray;
    letter-spacing: 3px;
    transition: all 0.4s ease 0s;
  }

  #shopping-bag-total {
    padding-left: 20px;
    padding-right: 20px;
      width: fit-content;

  }
}
</style>
