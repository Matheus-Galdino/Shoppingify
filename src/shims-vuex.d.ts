import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

import Item from "./models/Item.interface";
import Category from "./models/Category.interface";
import ItemGroup from "./models/ItemGroup.interface";
import ShoppingList from "./models/ShoppingList.interface";
import Toast from "./models/Toast.interface";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    showToast: Boolean;
    toastConfig: Toast;
    detailItem: Item;
    items: Group<Item>[];
    categories: Category[];
    lists: ShoppingList[];
    activeList: ShoppingList;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
