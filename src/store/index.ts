import ItemGroup from "@/models/ItemGroup.interface";
import { createStore } from "vuex";

import API from "../API";

export default createStore({
  state: {
    items: [] as ItemGroup[],
  },
  mutations: {
    setItems(state, items: ItemGroup[]) {
      state.items = items;
    },
  },
  actions: {
    async getItems({ commit }) {
      const items = await API.getItems();
      commit("setItems", items);
    },
  },
});
