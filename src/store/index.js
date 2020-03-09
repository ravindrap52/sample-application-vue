import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rating: "",
    age: "",
    email: ""
  },
  mutations: {
    mutateRatingState(state, payload) {
      state.rating = payload;
    },
    mutateAgeState(state, payload) {
      state.age = payload;
    },
    mutateEmailState(state, payload) {
      state.email = payload;
    }
  },
  actions: {
    updateRating({ commit }, payload) {
      commit("mutateRatingState", payload);
    },
    updateAge({ commit }, payload) {
      commit("mutateAgeState", payload);
    },
    updateEmail({ commit }, payload) {
      commit("mutateEmailState", payload);
    }
  },
  getters: {
    rating(state) {
      return state.rating;
    },
    age(state) {
      return state.age;
    },
    email(state) {
      return state.email;
    }
  }
});
