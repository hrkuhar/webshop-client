<template>
  <div class="home">
    <transition name="fade" mode="out-in">
      <div id="background-image-1" v-if="showBackground1" key="img1" />
      <div id="background-image-2" v-else-if="showBackground2" key="img2" />
      <div id="background-image-3" v-else-if="showBackground3" key="img3" />
      <div id="background-image-4" v-else-if="showBackground4" key="img4" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      showBackground1: false,
      showBackground2: false,
      showBackground3: false,
      showBackground4: false
    };
  },
  created: function() {
    // `this` points to the vm instance

    let self = this;

    window.setInterval(function() {
      if (self.showBackground1) {
        self.showBackground1 = false;
        self.showBackground2 = true;
      } else if (self.showBackground2) {
        self.showBackground2 = false;
        self.showBackground3 = true;
      } else if (self.showBackground3) {
        self.showBackground3 = false;
        self.showBackground4 = true;
      } else if (self.showBackground4) {
        self.showBackground4 = false;
        self.showBackground1 = true;
      }
    }, 5000);
  },
  mounted: function() {
    this.showBackground1 = true;
  },
  methods: {}
};
</script>

<style scoped>
#background-image-1 {
  background: url(../assets/background-home-1.jpg) no-repeat top center;
}

#background-image-2 {
  background: url(../assets/background-home-2.jpg) no-repeat bottom center;
}

#background-image-3 {
  background: url(../assets/background-home-3.jpg) no-repeat center center;
}

#background-image-4 {
  background: url(../assets/background-home-4.jpg) no-repeat center center;
}

#background-image-1,
#background-image-2,
#background-image-3,
#background-image-4 {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: calc(100vh - 50px);
  max-width: 100vw;
  margin: 0;
  margin-top: 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.home {
  background: url(../assets/logo-image.png) no-repeat center center;
}

@media (min-width: 40rem) {
  #background-image-1,
  #background-image-2,
  #background-image-3,
  #background-image-4 {
    min-height: calc(100vh - 60px);
    margin-top: 60px;
  }

  .home {
    background-size: 25%;
  }
}
</style>
