import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

import Item from "./models/Item.interface";
import ItemGroup from "./models/ItemGroup.interface";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    items: ItemGroup[];
    detailItem: Item
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
