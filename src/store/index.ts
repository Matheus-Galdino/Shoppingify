import Item from "@/models/Item.interface";
import Toast from "@/models/Toast.interface";
import Group from "@/models/Group.interface";
import Category from "@/models/Category.interface";

import { createStore } from "vuex";

import ItemAPI from "@/services/ItemAPI";
import ListAPI from "@/services/ListAPI";
import StatsAPI from "@/services/StatsAPI";
import CategoryAPI from "@/services/CategoryAPI";

import ShoppingList from "@/models/ShoppingList.interface";
import ShoppingListItem from "@/models/ShoppingListItem.interface";
import Stat from "@/models/Stat.interface";

const initialState = {
  userToken: "",
  loading: false,
  showToast: false,
  toastConfig: {} as Toast,
  detailItem: {} as Item,
  items: [] as Group<Item>[],
  categories: [] as Category[],
  lists: [] as ShoppingList[],
  activeList: {} as ShoppingList,
  topItems: [] as Stat[],
  topCategories: [] as Stat[],
  monthlySummary: [] as Stat[],
};

export default createStore({
  state: {
    userToken: "",
    loading: false,
    showToast: false,
    toastConfig: {} as Toast,
    detailItem: {} as Item,
    items: [] as Group<Item>[],
    categories: [] as Category[],
    lists: [] as ShoppingList[],
    activeList: {} as ShoppingList,
    topItems: [] as Stat[],
    topCategories: [] as Stat[],
    monthlySummary: [] as Stat[],
  },
  getters: {
    getList: (state) => (listId: number) => state.lists.find((x) => x.id === listId),
    isAuthed: (state) => state.userToken != "",
  },
  mutations: {
    setToken(state, payload: string) {
      state.userToken = payload;
    },
    setLoading(state, payload: boolean) {
      state.loading = payload;
    },
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
    setMonthlySummary(state, payload: Stat[]) {
      state.monthlySummary = payload;
    },
    resetStore(state) {
      Object.assign(state, initialState);
    },
  },
  actions: {
    async getItems({ state, commit }) {
      const items = await ItemAPI.getItems(state.userToken);
      commit("setItems", items);
    },
    async getCategories({ state, commit }) {
      const categories = await CategoryAPI.getCategories(state.userToken);
      commit("setCategories", categories);
    },
    async getLists({ state, commit }) {
      const lists = await ListAPI.getLists(state.userToken);
      commit("setLists", lists);
    },
    async getActiveListItems({ commit, state }) {
      const items = await ListAPI.getListItems(state.activeList.id, state.userToken);
      commit("setActiveListItems", items);
    },
    async getTopItems({ state, commit }) {
      const topItems = await StatsAPI.getTopItems(state.userToken);
      commit("setTopItems", topItems);
    },
    async getTopCategories({ state, commit }) {
      const topCategories = await StatsAPI.getTopCategories(state.userToken);
      commit("setTopCategories", topCategories);
    },
    async getMonthlySummary({ state, commit }) {
      const monthlySummary = await StatsAPI.getMonthlySummary(state.userToken);
      commit("setMonthlySummary", monthlySummary);
    },
  },
});
