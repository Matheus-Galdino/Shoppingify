<template>
  <Nav @display-aside="showList = !showList" />

  <transition name="slide" mode="out-in">
    <router-view
      v-if="!showList"
      @changeAside="
        currentTab = $event;
        showList = true;
      "
    />

    <component
      v-else
      :is="currentTab"
      @changeAside="currentTab = $event"
    ></component>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Nav from "./components/Nav.vue";
import AddItem from "./components/AddItem.vue";
import ActiveList from "./components/ActiveList.vue";
import ItemReview from "./components/ItemReview.vue";

export default defineComponent({
  name: "App",
  components: { Nav, AddItem, ActiveList, ItemReview },
  data() {
    return {
      showList: false,
      currentTab: "ActiveList",
    };
  },
  methods: {
    toogleList() {
      this.showList = !this.showList;
    },
  },
});
</script>

<style lang="scss">
@import "./scss/reset.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: #fafafe;

  display: grid;
  grid-template-columns: auto 1fr;
}

.slide-enter-active {
  animation: slide-in 0.2s;
}

.slide-leave-active {
  animation: slide-in 0.2s reverse;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
