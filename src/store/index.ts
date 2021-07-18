import Item from "@/models/Item.interface";
import Category from "@/models/Category.interface";
import ItemGroup from "@/models/ItemGroup.interface";

import { createStore } from "vuex";

import API from "../API";
import ShoppingList from "@/models/ShoppingList.interface";

export default createStore({
  state: {
    items: [] as ItemGroup[],
    detailItem: {} as Item,
    categories: [] as Category[],
    lists: [] as ShoppingList[],
  },
  getters: {
    activeList(state) {
      return state.lists.find(x => x.active);
    },
    activeListCount(state, getters) {
      return getters.activeList?.items?.length ?? 0;            
    },
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
    setLists(state, lists: ShoppingList[]) {
      state.lists = lists;
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
    async getLists({ commit }) {
      const lists = await API.getLists();
      commit("setLists", lists);
    },
  },
});
