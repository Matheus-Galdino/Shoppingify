import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import ItemGroup from "./models/ItemGroup.interface";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    items: ItemGroup[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
