import { Store } from "vuex";
import { ComponentCustomProperties } from "vue";

import { Item, Stat, Toast, Category, Group, ShoppingList} from "./models";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    userToken: string;
    loading: boolean;
    showToast: boolean;
    toastConfig: Toast;
    detailItem: Item;
    items: Group<Item>[];
    categories: Category[];
    lists: ShoppingList[];
    activeList: ShoppingList;
    topItems: Stat[];
    topCategories: Stat[];
    monthlySummary: Stat[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
