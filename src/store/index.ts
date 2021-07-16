import Item from "@/models/Item.interface";
import Category from "@/models/Category.interface";
import ItemGroup from "@/models/ItemGroup.interface";

import { createStore } from "vuex";

import API from "../API";

export default createStore({
  state: {
    items: [] as ItemGroup[],
    detailItem: {} as Item,
    categories: [] as Category[],
  },
  mutations: {
    setItems(state, items: ItemGroup[]) {
      state.items = items;
    },
    setDetailItem(state, item: Item) {
      state.detailItem = item;
    },
    setCategories(state, categories: Category[]) {
      state.categories = categories;
    },
  },
  actions: {
    async getItems({ commit }) {
      const items = await API.getItems();
      commit("setItems", items);
    },
    async getCategories({ commit }) {
      const categories = await API.getCategories();
      commit("setCategories", categories);
    },
  },
});
