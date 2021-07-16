<template>
  <Nav @display-aside="toggleList" />

  <transition name="slide" mode="out-in">
    <router-view
      v-if="!showAside"
      @change-aside="
        currentTab = $event;
        showAside = true;
      "
    />

    <component
      v-else
      :is="currentTab"
      @change-aside="currentTab = $event"
      @change-aside-and-close="
        showAside = false;
        currentTab = 'ActiveList';
      "
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
      showAside: false,
      currentTab: "ActiveList",
    };
  },
  methods: {
    toggleList() {
      this.showAside = !this.showAside;
    },
  },
  async beforeMount() {
    await this.$store.dispatch("getItems");
    await this.$store.dispatch("getCategories");
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
