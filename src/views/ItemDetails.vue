<template>
  <div class="container">
    <img class="item-image" :src="item.image" />
    <div class="right-container">
      <p class="item-title-container">{{item.title}}</p>
      <p class="item-description-container">{{item.description}}</p>
      <p class="item-price-container">{{item.price}}</p>
      <button class="add-to-bag-button" v-on:click="addToBag">ADD TO BAG</button>
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
  padding: 0 10px;
}

.right-container {
    text-align: center;
  }

.item-title-container {
  font-size: 1.1em;
  color: grey;
  margin-bottom: 30px;
}

.item-price-container {
  font-size: 1.3em;
    padding-top: 30px;
    padding-bottom: 30px;

}

.item-description-container {
  font-size: 1em;
  margin-top: 0;
  text-align: left;
  line-height: 1.5;
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
  border-radius: 5px;
  padding-left: 20px;
  padding-right: 20px;
  transition: all 0.4s ease 0s;
}

.add-to-bag-button:focus {
  outline: none;
}

.container{
  padding: 10px;
    background-color: white;
        min-height: calc(100vh - 60px);
}

@media (min-width: 40rem) {
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
   padding-left: 250px;
    padding-right: 250px;
    margin: auto;
    background-color: transparent;
  }

  .item-image {
    width: 35%;
    padding-right: 30px;
  }

  

  .add-to-bag-button {
    width: auto;
  }

  .add-to-bag-button:hover{
        cursor: pointer;

  background-color: green;
letter-spacing: 3px;
transition: all 0.4s ease 0s;
}

}
</style>
