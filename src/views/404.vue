<template>
  <section class="page-404">
    <img src="../assets/Scarecrow.png" alt="" />

    <div class="right-column">
      <p>
        The page you are looking for might be removed or is temporarily
        unavailable
      </p>

      <router-link to="/">Back to homepage </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "404",
});
</script>

<style lang="scss" scoped>
.page-404 {
  padding: 5rem;
  text-align: center;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  img {
    width: 100%;
    max-width: 50rem;
  }
}

p {
  margin: 3rem 0;
  max-width: 30ch;
  color: #4f4f4f;
  letter-spacing: -0.035em;
  font-size: clamp(3rem, 2vw, 4rem);
}

a {
  display: inline-block;
  padding: 1.5rem 2rem;

  font-size: 2rem;
  text-decoration: none;

  color: #fff;
  border-radius: 15px;
  background: #f9a109;
}
</style>