<template>
  <section class="page auth">
    <div class="card">
      <router-view></router-view>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Auth",
});
</script>

<style lang="scss">
.auth {
  width: 100vw;
  height: 100vh;

  display: grid;
  place-items: center;
}

.card {
  width: 90vw;
  max-width: 600px;

  padding: 2rem;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);

  .title {
    color: #f9a109;
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .action-group {
    display: flex;
    column-gap: 2rem;
    justify-content: center;

    button,
    a {
      font-weight: 700;
      margin-top: 2rem;
      font-size: 1.5rem;
      padding: 2rem 4rem;
      border-radius: 12px;
    }

    button {
      color: #fff;
      background: #f9a109;
    }

    a {
      color: #f9a109;
      text-decoration: none;
      border: 1px solid #f9a109;
    }
  }
}
</style>