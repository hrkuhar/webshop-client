<template>
  <div class="container">
    <img class="item-image" :src="item.image" />
    <div class="right-container">
      <p class="item-title-container">{{item.title}}</p>
      <p class="item-description-container">{{item.description}}</p>
      <p class="item-price-container">{{item.price}}</p>
      <button class="add-to-bag-button" v-on:click="addToBag">Add to bag</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "itemDetails",
  methods: {
    addToBag: function() {
      this.$store.commit("addToBag", this.item.id);
    }
  },
  computed: {
    item: function() {
      return this.$store.getters.item(this.$route.params.id);
    }
  }
};
</script>

<style scoped>
.item-image {
  width: 100%;
}

.item-title-container {
  font-size: 1.1em;
  color: grey;
  margin-bottom: 20px;
}

.item-price-container {
  font-size: 1.3em;
}

.item-description-container {
  font-size: 1em;
  margin-top: 0;
  text-align: left;
}

.add-to-bag-button {
  width: 100%;
  margin: auto;
  display: block;
  height: 50px;
  color: white;
  background-color: black;
  border: 0;
  font-size: 1.1em;
  font-weight: 600;
  border-radius: 15px;
}

.add-to-bag-button:focus {
  outline: none;
}

.container{
  padding: 10px;
  padding-top: 20px;
}

@media (min-width: 40rem) {
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 40px;
    padding-left: 100px;
    padding-right: 100px;
    max-width: 1200px;
    margin: auto;
  }

  .item-image {
    width: 50%;
    padding-right: 10px;
  }

  .right-container {
    width: 100%;
    text-align: center;
  }

  .add-to-bag-button {
    max-width: 350px;
    width: 80%;
  }

  .add-to-bag-button:hover {
    cursor: pointer;
  }
}
</style>
