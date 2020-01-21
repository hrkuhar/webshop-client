import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mobileMenuShown: false,
    shoppingBagSummaryShown: false,
    items: []
  },
  mutations: {
    showMobileMenu(state) {
      state.mobileMenuShown = true;
    },
    hideMobileMenu(state) {
      state.mobileMenuShown = false;
    },
    showShoppingBagSummary(state) {
      state.shoppingBagSummaryShown = true;
    },
    hideShoppingBagSummary(state) {
      state.shoppingBagSummaryShown = false;
    },
    setItems(state, items) {
      state.items = items;
    },
    addToBag(state, id) {
      var item = this.getters.item(id);
      item.countInBag = item.countInBag == undefined ? 1 : item.countInBag + 1;
    },
    removeFromBag(state, id) {
      var item = this.getters.item(id);
      if (item.countInBag != undefined && item.countInBag > 0) {
        item.countInBag--;
      }
    },
    clearFromBag(state, id) {
      var item = this.getters.item(id);
      if (item.countInBag != undefined && item.countInBag > 0) {
        item.countInBag = 0;
      }
    },
    clearBag(state){
      state.items.forEach(item => {
        item.countInBag = 0;
      });
    }
  },
  getters: {
    categories: state => {
      var categories = [];
      for (var item of state.items) {
        if (categories.filter(c => c.name == item.category).length == 0) {
          categories.push({ name: item.category, subCategories: [] });
        }
        if (
          categories
            .filter(c => c.name == item.category)[0]
            .subCategories.filter(s => s.name == item.subCategory) == 0
        ) {
          categories
            .filter(c => c.name == item.category)[0]
            .subCategories.push({ name: item.subCategory });
        }
      }
      return categories;
    },
    item(state) {
      return id => state.items.filter(i => i.id == id)[0];
    },
    shoppingBag: state => {
      return state.items.filter(i => i.countInBag >= 1);
    },
    shoppingBagTotalPrice: state => {
      var total = 0;
      var items = state.items.filter(i => i.countInBag >= 1);
      for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var cost = item.price.split(" ")[0].replace(",", ".");
        if(cost.indexOf(".") != cost.lastIndexOf(".")){
          cost = cost.slice(0, cost.indexOf(".")) + cost.slice(cost.indexOf(".") + 1);
        }
        total += cost * item.countInBag;
      }
      return total.toFixed(2) + " kn";
    },
    shoppingBagIsEmpty: state => {
      return state.items.filter(i => i.countInBag >= 1).length == 0;
    },
    shoppingBagItemCount: state => {
      return state.items.reduce((total, item) => {
        return total + item.countInBag;
      }, 0);
    }
  }
});
