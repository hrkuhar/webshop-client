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
  margin-left: 20px;
  margin-bottom: 5px;
}

.item-price-container {
  font-size: 1.3em;
  margin-left: 20px;
}

.item-description-container {
  font-size: 1em;
  margin-left: 20px;
  margin-top: 0;
}

.add-to-bag-button {
  width: 96%;
  margin: auto;
  display: block;
  height: 50px;
  color: white;
  background-color: black;
  border: 0;
  font-size: 1.1em;
  font-weight: 600;
}

.add-to-bag-button:focus {
  outline: none;
}

@media (min-width: 40rem) {
.container{
   display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 100px;
  margin-right: 100px;
  padding-top: 40px;
}

.item-image{
  width: 50%;
}

.right-container{
  width: 100%;
  text-align: center;
}

.add-to-bag-button{
  max-width: 400px;
}

.add-to-bag-button:hover{
  cursor: pointer;
}



}
</style>
