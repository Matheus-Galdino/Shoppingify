<template>
  <Nav @display-aside="toggleList" />

  <transition name="slide" mode="out-in">
    <router-view
      v-if="!showAside"
      @change-aside="
        currentTab = $event;
        showAside = true;
      "
      @show-toast="toggleToast($event)"
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

  <transition name="slide">
    <toast :config="toastConfig" v-show="showToast" @close="closeToast" />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Nav from "./components/Nav.vue";
import Toast from "@/components/Toast.vue";
import AddItem from "./components/AddItem.vue";
import ActiveList from "./components/ActiveList.vue";
import ItemReview from "./components/ItemReview.vue";

import ToastType from "./models/Toast.interface";

export default defineComponent({
  name: "App",
  components: { Nav, Toast, AddItem, ActiveList, ItemReview },
  data() {
    return {
      timeout: 0,
      showAside: false,
      showToast: false,
      currentTab: "ActiveList",
      toastConfig: {} as ToastType,
    };
  },
  methods: {
    toggleList() {
      this.showAside = !this.showAside;
    },
    closeToast() {
      this.showToast = false;
      clearTimeout(this.timeout);
    },
    toggleToast(toast: ToastType) {
      this.showToast = true;
      this.toastConfig = toast;

      this.timeout = setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
  },
  async beforeMount() {
    await this.$store.dispatch("getItems");
    await this.$store.dispatch("getLists");
    await this.$store.dispatch("getCategories");

    this.$store.commit("setActiveList");

    if (!this.$store.state.activeList?.id) return;

    await this.$store.dispatch("getActiveListItems");
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
