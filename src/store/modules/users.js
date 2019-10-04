/* eslint-disable promise/param-names */
import Vue from "vue";

const mockAllUers = [
  {
    name: "user 1"
  }, {
    name: "user 2"
  }
]
const actions = {
  LOAD_ALL_USERS: ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit("SET_USERS", mockAllUers);
        // NOW GET CURRENT USER
        commit("SET_CURRENT_USER", mockAllUers[0]);
        resolve(mockAllUers[0]);
    });
  },
};

const mutations = {
  SET_USERS: (state, users) => {
    Vue.set(state, "all", users);
  },
  SET_CURRENT_USER: (state, user) => {
    Vue.set(state, "currentUser", user);
  },
  SET_CURRENT_SIDE: (state, side) => {
    Vue.set(state, "currentSide", side);
  },
};

const state = {
  all: [],
  currentUser: {},
  currentSide: null
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
