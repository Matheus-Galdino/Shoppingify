import Item from "@/models/Item.interface";
import Toast from "@/models/Toast.interface";
import Group from "@/models/Group.interface";
import Category from "@/models/Category.interface";

import { createStore } from "vuex";

import API from "../API";
import ShoppingList from "@/models/ShoppingList.interface";
import ShoppingListItem from "@/models/ShoppingListItem.interface";
import Stat from "@/models/Stat.interface";

export default createStore({
  state: {
    showToast: false,
    toastConfig: {} as Toast,
    detailItem: {} as Item,
    items: [] as Group<Item>[],
    categories: [] as Category[],
    lists: [] as ShoppingList[],
    activeList: {} as ShoppingList,
    topItems: [] as Stat[],
    topCategories: [] as Stat[],
  },
  getters: {
    activeListCount(state) {
      return state.activeList?.items?.length ?? 0;
    },
    getList: (state) => (listId: number) => state.lists.find((x) => x.id === listId),
  },
  mutations: {
    setShowToast(state, payload: boolean) {
      state.showToast = payload;
    },
    setToastConfig(state, payload: Toast) {
      state.toastConfig = payload;
    },
    setItems(state, items: Group<Item>[]) {
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
    setActiveList(state) {
      state.activeList = state.lists.find((x) => x.active) ?? ({} as ShoppingList);
    },
    setActiveListItems(state, items: Group<ShoppingListItem>[]) {
      if (!state.activeList) return;

      state.activeList.items = items;
    },
    setTopItems(state, payload: Stat[]) {
      state.topItems = payload;
    },
    setTopCategories(state, payload: Stat[]) {
      state.topCategories = payload;
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
    async getActiveListItems({ commit, state }) {
      const items = await API.getListItems(state.activeList.id);
      commit("setActiveListItems", items);
    },
    async getTopItems({ commit }) {
      const topItems = await API.getTopItems();
      commit("setTopItems", topItems);
    },
    async getTopCategories({ commit }) {
      const topCategories = await API.getTopCategories();
      commit("setTopCategories", topCategories);
    },
  },
});
