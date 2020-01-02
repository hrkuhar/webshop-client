<template>
  <div class="home">
    <div class="home-background-image" id="background-image-1" />
    <div class="home-background-image" id="background-image-2" />
    <div class="home-background-image" id="background-image-3" />
    <div class="home-background-image" id="background-image-4" />
  </div>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      shownImage: 1
    };
  },
  created: function() {
    // `this` points to the vm instance

    let self = this;

    window.setInterval(function() {
      console.log(self.shownImage);

      if (self.shownImage == 1) {
        document.getElementById("background-image-2").style.display = "none";
        document.getElementById("background-image-3").style.display = "none";
        document.getElementById("background-image-4").style.display = "none";
        document.getElementById("background-image-1").style.display = "block";
      } else if (self.shownImage == 2) {
        document.getElementById("background-image-1").style.display = "none";
        document.getElementById("background-image-3").style.display = "none";
        document.getElementById("background-image-4").style.display = "none";
        document.getElementById("background-image-2").style.display = "block";
      } else if (self.shownImage == 3) {
        document.getElementById("background-image-1").style.display = "none";
        document.getElementById("background-image-2").style.display = "none";
        document.getElementById("background-image-4").style.display = "none";
        document.getElementById("background-image-3").style.display = "block";
      } else if (self.shownImage == 4) {
        document.getElementById("background-image-1").style.display = "none";
        document.getElementById("background-image-2").style.display = "none";
        document.getElementById("background-image-3").style.display = "none";
        document.getElementById("background-image-4").style.display = "block";
      }

      self.shownImage = self.shownImage == 4 ? 1 : self.shownImage + 1;
    }, 5000);
  },
  methods: {
    test: function() {
      console.log("test");
    }
  }
};
</script>

<style scoped>
#background-image-1 {
  background: url(../assets/background-home-1.jpg) no-repeat top center;
  display: block;
}

#background-image-2 {
  background: url(../assets/background-home-2.jpg) no-repeat bottom center;
  display: none;
}

#background-image-3 {
  background: url(../assets/background-home-3.jpg) no-repeat center center;
  display: none;
}

#background-image-4 {
  background: url(../assets/background-home-4.jpg) no-repeat center center;
  display: none;
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

@media (min-width: 40rem) {
  #background-image-1,
  #background-image-2,
  #background-image-3,
  #background-image-4 {
    min-height: calc(100vh - 60px);
    margin-top: 60px;
  }
}
</style>
