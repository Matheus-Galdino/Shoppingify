<template>
  <nav>
    <img src="./assets/logo.svg" alt="logo" />

    <ul class="nav-links" :style="`--top: ${top}`">
      <li class="nav-link" @click="handleTabs">
        <router-link to="/">
          <span class="material-icons"> format_list_bulleted </span>
        </router-link>
      </li>
      <li class="nav-link" @click="handleTabs">
        <router-link to="/">
          <span class="material-icons"> refresh </span>
        </router-link>
      </li>
      <li class="nav-link" @click="handleTabs">
        <router-link to="/">
          <span class="material-icons"> insights </span>
        </router-link>
      </li>
    </ul>

    <div class="cart" data-count="4">
      <span class="material-icons-outlined"> shopping_cart </span>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      top: 0,
    };
  },
  methods: {
    handleTabs(e: Event) {
      const element = e.target as HTMLElement;
      this.top = element.offsetTop;
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
  column-gap: 2rem;
  grid-template-columns: auto 1fr;
}

nav {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  width: 14vw;
  height: 100vh;
  padding: 2rem 0;
  background: #fff;
}

.material-icons {
  color: #454545;
}

.nav-links {
  width: 100%;
  display: block;
  position: relative;

  &::before {
    content: "";
    width: 6px;
    height: 40px;

    position: absolute;
    left: 0;
    top: calc(var(--top) * 1px);

    background: #f9a109;
    transform: translateY(-10%);
    transition: all 0.4s ease-out;
    border-radius: 0px 4px 4px 0px;
  }
}

.nav-link {
  display: flex;
  justify-content: center;
}

.nav-link:not(:last-of-type) {
  margin-bottom: 5rem;
}

.cart {
  width: 4rem;
  height: 4rem;
  position: relative;

  display: grid;
  place-content: center;

  padding: 1rem;
  color: #fff;
  border-radius: 50%;
  background: #f9a109;

  &::before {
    content: attr(data-count);
    position: absolute;
    top: 0;
    right: 0;

    color: #fff;
    padding: 4px 6px;
    font-size: 1.3rem;
    font-weight: bold;
    border-radius: 4px;
    background: #eb5757;

    transform: translateY(-50%);
  }
}
</style>
