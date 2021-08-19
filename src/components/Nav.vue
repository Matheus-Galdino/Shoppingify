<template>
  <nav>
    <img src="../assets/logo.svg" alt="logo" />

    <ul class="nav-links" :style="`--top: ${top}`">
      <li class="nav-link">
        <router-link to="/" id="Home-link">
          <span class="material-icons"> format_list_bulleted </span>
        </router-link>
      </li>
      <li class="nav-link">
        <router-link to="/history" id="History-link">
          <span class="material-icons"> refresh </span>
        </router-link>
      </li>
      <li class="nav-link">
        <router-link to="/stats" id="Stats-link">
          <span class="material-icons"> insights </span>
        </router-link>
      </li>
      <li class="nav-link">
        <router-link to="/settings" id="Settings-link">
          <span class="material-icons"> settings </span>
        </router-link>
      </li>
    </ul>

    <div
      class="cart"
      :data-count="activeListCount"
      @click="$emit('display-aside')"
    >
      <span class="material-icons-outlined"> shopping_cart </span>
    </div>
  </nav>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav",
  computed: {
    ...mapGetters(["activeListCount"]),
    top() {
      const routeName = this.$route.name?.toString();

      return document.getElementById(`${routeName}-link`)?.offsetTop ?? 0;
    },
  },
});
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  width: 60px;
  height: 100vh;
  padding: 2rem 0;
  background: #fff;

  @media (min-width: 800px) {
    width: 100px;
  }
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
  cursor: pointer;
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