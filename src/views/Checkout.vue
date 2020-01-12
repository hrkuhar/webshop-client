<template>
  <div id="checkout-container">
    <label for="first-name">First name</label>
    <input id="first-name" type="text" />
    <label for="last-name">Last name</label>
    <input id="last-name" type="text" />
    <label for="delivery-address">Delivery address</label>
    <input id="delivery-address" type="text" />
    <label for="note">Note</label>
    <textarea id="note"></textarea>
    <button id="order-button" v-on:click="orderClicked">ORDER</button>
    <div id="result-overlay" v-if="showResultOverlay">
      <transition name="pop">
        <div id="success-message-popup" v-if="showSuccessMessagePopup">
          <div id="success-message-container">
            <p id="message-success">THANK YOU FOR YOUR PURCHASE!</p>
            <img id="icon-success" alt="success icon" src="../assets/icon-success.png" />
            <button id="button-success-confirm" v-on:click="successConfirmed">CONTINUE</button>
          </div>
        </div>
      </transition>
      <transition name="pop">
        <div id="failure-message-popup" v-if="showFailureMessagePopup">
          <div id="failure-message-container">
            <p
              id="message-failure"
            >OOOPS, SOMETHING WENT WRONG... PLEASE, CHECK YOUR INTERNET CONNECTION AND TRY AGAIN!</p>
            <img id="icon-failure" alt="failure icon" src="../assets/icon-failure.png" />
            <button id="button-failure-confirm" v-on:click="failureConfirmed">BACK</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkout",
  data: function() {
    return {
      showResultOverlay: false,
      showSuccessMessagePopup: false,
      showFailureMessagePopup: false
    };
  },
  methods: {
    orderClicked: function() {
      var firstName = document.getElementById("first-name").value;
      var lastName = document.getElementById("last-name").value;
      var deliveryAddress = document.getElementById("delivery-address").value;
      var note = document.getElementById("note").value;

      var canProceed = true;

      if (
        firstName == null ||
        firstName == undefined ||
        firstName.trim() === ""
      ) {
        document.getElementById("first-name").style.borderBottom =
          "2px solid red";
        canProceed = false;
      } else {
        document.getElementById("first-name").style.borderBottom =
          "2px solid lightgrey";
      }

      if (lastName == null || lastName == undefined || lastName.trim() === "") {
        document.getElementById("last-name").style.borderBottom =
          "2px solid red";
        canProceed = false;
      } else {
        document.getElementById("last-name").style.borderBottom =
          "2px solid lightgrey";
      }

      if (
        deliveryAddress == null ||
        deliveryAddress == undefined ||
        deliveryAddress.trim() === ""
      ) {
        document.getElementById("delivery-address").style.borderBottom =
          "2px solid red";
        canProceed = false;
      } else {
        document.getElementById("delivery-address").style.borderBottom =
          "2px solid lightgrey";
      }

      if (!canProceed) {
        return;
      }

      var request = {};
      request.firstName = firstName;
      request.lastName = lastName;
      request.deliveryAddress = deliveryAddress;
      request.note = note;
      request.items = this.shoppingBag;

      this.showResultOverlay = true;

      fetch("http://localhost:3000/api/orders/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      })
        .then(response => {
          console.log(response.text());
          this.$store.commit("clearBag");
          this.showSuccessMessagePopup = true;
        })
        .catch(reason => {
          console.log("ORDER ERROR: " + reason);
          this.showFailureMessagePopup = true;
        });
    },
    successConfirmed: function() {
      this.$router
        .push({
          name: "home"
        })
        .catch(err => console.log(err.message));
    },
    failureConfirmed: function() {
      this.showResultOverlay = false;
      this.showFailureMessagePopup = false;
    }
  },
  computed: {
    shoppingBag: function() {
      return this.$store.getters.shoppingBag;
    }
  }
};
</script>

<style scoped>
#checkout-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  margin-left: 20px;
  margin-right: 20px;
}

input {
  display: block;
  width: 100%;
  height: 40px;
  font-size: 1.4em;
  border: none;
  border-bottom: 2px solid lightgrey;
}

input:focus {
  border: none;
  outline: none;
  border-bottom: 2px solid black;
}

textarea {
  display: block;
  width: 100%;
  height: 200px;
  resize: none;
  font-size: 1.4em;
  border: 2px solid lightgrey;
}

textarea:focus {
  outline: none;
  border: 2px solid black;
}

label {
  margin-top: 40px;
  margin-bottom: 10px;
}

button {
  width: 100%;
  margin: auto;
  display: block;
  height: 50px;
  color: white;
  background-color: black;
  border: 0;
  font-size: 1.1em;
  font-weight: 600;
  margin-top: 80px;
  margin-bottom: 20px;
}

button:focus {
  outline: none;
}

#result-overlay {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}

#success-message-popup,
#failure-message-popup {
  width: 80%;
  height: 60%;
  position: absolute;
  top: 20%;
  left: 10%;
  background-color: white;
  padding: 0;
  margin: 0;
}

#success-message-container,
#failure-message-container {
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
}

#button-success-confirm,
#button-failure-confirm {
  margin: 0 0 10px 0;
}

#message-success,
#message-failure {
  font-size: 1.1em;
  font-weight: 600;
  height: 50px;
  text-align: center;
  padding: 0 10px 0 10px;
}

.pop-enter-active {
  animation: bounce-in 1s;
}
.pop-leave-active {
  animation: bounce-in 1s reverse;
}

#icon-success,
#icon-failure {
  width: 150px;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media (min-width: 40rem) {
  button,
  input,
  textarea {
    max-width: 600px;
  }

  button:hover {
    cursor: pointer;
  }

  #success-message-popup,
  #failure-message-popup {
    width: 50%;
    height: 70%;
    position: absolute;
    top: 15%;
    left: 25%;
  }

  #icon-success,
  #icon-failure {
    width: 200px;
  }
}
</style>
