import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

import Item from "./models/Item.interface";
import Category from "./models/Category.interface";
import ItemGroup from "./models/ItemGroup.interface";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    items: ItemGroup[];
    detailItem: Item;
    categories: Category[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
