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

    <button class="exit" @click="logout">
      <span class="material-icons"> logout </span>
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav",
  methods: {
    logout() {
      sessionStorage.clear();
      localStorage.removeItem("userHash");
      this.$store.commit("resetStore");
      this.$router.push("/auth/login");
    }
  },
  computed: {
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

.exit {
  color: #f9a109;
  background: none;
}
</style>