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
    <toast
      v-show="showToast"
      @close="closeToast"
      :config="toastConfig"
      :percentage="percentage"
    />
  </transition>

  <Mask v-show="loading">
    <div class="spinner"></div>
  </Mask>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Nav from "./components/Nav.vue";
import Mask from "./components/Mask.vue";
import Toast from "@/components/Toast.vue";
import AddItem from "./components/AddItem.vue";
import ActiveList from "./components/ActiveList.vue";
import ItemReview from "./components/ItemReview.vue";

export default defineComponent({
  name: "App",
  components: { Nav, Mask, Toast, AddItem, ActiveList, ItemReview },
  data() {
    return {
      timeout: 0,
      timeLeft: 0,
      showAside: false,
      currentTab: "ActiveList",
    };
  },
  methods: {
    toggleList() {
      this.showAside = !this.showAside;
    },
    closeToast() {
      this.$store.commit("setShowToast", false);
      clearTimeout(this.timeout);
    },
    toggleToast() {
      this.timeLeft = 2000;

      const interval = setInterval(() => {
        this.timeLeft -= 12;

        if (this.timeLeft == 0 || !this.showToast) clearInterval(interval);
      }, 1);

      this.timeout = setTimeout(() => {
        this.$store.commit("setShowToast", false);
      }, 2000);
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    showToast() {
      return this.$store.state.showToast;
    },
    toastConfig() {
      return this.$store.state.toastConfig;
    },
    percentage(): number {
      const value = Math.ceil(100 - (this.timeLeft * 100) / 2000);
      console.log(value);
      return value;
    },
  },
  watch: {
    showToast(newValue) {
      if (newValue) this.toggleToast();
    },
  },
  async beforeMount() {
    this.$store.commit("setLoading", true);

    await this.$store.dispatch("getItems");
    await this.$store.dispatch("getLists");
    await this.$store.dispatch("getCategories");
    await this.$store.dispatch("getTopItems");
    await this.$store.dispatch("getTopCategories");

    this.$store.commit("setActiveList");

    if (!this.$store.state.activeList?.id) {
      this.$store.commit("setLoading", false);
      return;
    }

    await this.$store.dispatch("getActiveListItems");

    this.$store.commit("setLoading", false);
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

.spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #fff;
  border-left: 5px solid #f9a109;
  animation: spin 1s linear infinite;
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
