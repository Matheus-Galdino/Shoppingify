<template>
  <div class="home">
    <section class="item-group">
      <h3 class="group-title">Fruit and vegetables</h3>

      <ul class="items">
        <li class="item" @click="$emit('changeAside', 'ItemReview')">
          <p>Avocado</p>
          <span class="material-icons"> add </span>
        </li>
        <li class="item">
          <p>Banana</p>
          <span class="material-icons"> add </span>
        </li>
        <li class="item">
          <p>Pre-cooked corn 450g</p>
          <span class="material-icons"> add </span>
        </li>
        <li class="item">
          <p>Mandarin Nadorcott</p>
          <span class="material-icons"> add </span>
        </li>
      </ul>
    </section>
    <section class="item-group">
      <h3 class="group-title">Fruit and vegetables</h3>

      <ul class="items">
        <li class="item">
          <p>Avocado</p>
          <span class="material-icons"> add </span>
        </li>
        <li class="item">
          <p>Banana</p>
          <span class="material-icons"> add </span>
        </li>
        <li class="item">
          <p>Pre-cooked corn 450g</p>
          <span class="material-icons"> add </span>
        </li>
        <li class="item">
          <p>Mandarin Nadorcott</p>
          <span class="material-icons"> add </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
});
</script>

<style lang="scss" scoped>
.home {
  padding: 3rem 2rem;
}

.group-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

.item-group {
  margin-bottom: 3rem;
}

.items {
  display: flex;
  row-gap: 2rem;
  flex-wrap: wrap;
  column-gap: 1rem;
  align-items: center;
}

.item {
  flex: 1;
  display: flex;
  column-gap: 2rem;
  align-items: center;
  justify-content: space-between;

  max-width: 200px;
  min-width: 150px;

  padding: 1.3rem;
  cursor: pointer;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);

  p {
    font-size: 1.4rem;
  }

  .material-icons {
    font-size: 2rem;
    color: #c1c1c4;
  }
}
</style>
