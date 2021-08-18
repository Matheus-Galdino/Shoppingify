import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

import Item from "./models/Item.interface";
import Category from "./models/Category.interface";
import ItemGroup from "./models/ItemGroup.interface";
import ShoppingList from "./models/ShoppingList.interface";
import Toast from "./models/Toast.interface";
import Stat from "./models/Stat.interface";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    loading: Boolean;
    showToast: Boolean;
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
