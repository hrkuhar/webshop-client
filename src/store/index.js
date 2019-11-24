import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mobileMenuShown : false,
    items: []
  },
  mutations: {
    showMobileMenu (state) {
      state.mobileMenuShown = true;
    },
    hideMobileMenu (state) {
      state.mobileMenuShown = false;
    },
    setItems(state, payload) {
      state.items = payload;
    }
  },
  getters: {
    categories: state => {
      var categories = [];

      for(var item of state.items){
        if(categories.filter(c => c.name == item.category).length == 0){
          categories.push({name : item.category, subCategories: []});
        }
        if(categories.filter(c => c.name == item.category)[0].subCategories.filter(s => s.name == item.subCategory) == 0){
          categories.filter(c => c.name == item.category)[0].subCategories.push({name: item.subCategory});
        }
      }

      return categories;
    }
  },
  actions: {},
  modules: {}
});
