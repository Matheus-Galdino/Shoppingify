import Item from "@/models/Item.interface";
import ItemGroup from "@/models/ItemGroup.interface";

import { createStore } from "vuex";

import API from "../API";

export default createStore({
  state: {
    items: [] as ItemGroup[],
    detailItem: {} as Item,
  },
  mutations: {
    setItems(state, items: ItemGroup[]) {
      state.items = items;
    },
    setDetailItem(state, item: Item) {
      state.detailItem = item;
    },
  },
  actions: {
    async getItems({ commit }) {
      const items = await API.getItems();
      commit("setItems", items);
    },
  },
});
