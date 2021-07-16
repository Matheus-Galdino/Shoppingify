<template>
  <aside class="item-review">
    <span class="back-button">
      <span class="material-icons"> arrow_back </span>
      back
    </span>

    <div class="item-review__body">
      <img :src="img" />

      <span class="title">name</span>
      <p class="content">Avocado</p>

      <span class="title">category</span>
      <p class="content">Fruit and vegetables</p>

      <span class="title">note</span>
      <p class="content">
        Nutrient-dense foods are those that provide substantial amounts of
        vitamins, minerals and other nutrients with relatively few calories.
        One-third of a medium avocado (50 g) has 80 calories and contributes
        nearly 20 vitamins and minerals, making it a great nutrient-dense food
        choice. s jasbfjksdbfjk

        <!-- max chars: 300 -->
      </p>
    </div>

    <div class="item-review__actions">
      <button class="borderless">delete</button>
      <button>Add to list</button>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ItemReview",
  data() {
    return {
      img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80",
    };
  },
});
</script>

<style lang="scss" scoped>
.item-review {
  padding: 3rem;
  max-width: 500px;

  display: grid;
  grid-template-rows: auto 1fr auto;
}

.back-button {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  cursor: pointer;
  color: #f9a109;
  font-weight: bold;
  font-size: 1.4rem;

  .material-icons {
    color: #f9a109;
    margin-right: 6px;
  }
}

.item-review__body {
  img {
    width: 100%;
    border-radius: 25px;
    margin-bottom: 1rem;
  }
}

.title {
  display: block;
  color: #c1c1c4;
  font-size: 1.5rem;

  margin-top: 3rem;
  margin-bottom: 1rem;
}

.content {
  font-size: 2rem;
}

.item-review__actions {
  text-align: center;

  button {
    display: inline-block;
    padding: 2rem 2.5rem;

    color: #fff;
    font-weight: bold;
    font-size: 1.6rem;
    border-radius: 12px;
    background: #f9a109;

    &.borderless {
      color: #34333a;
      margin-right: 2rem;
      background: transparent;
    }
  }
}
</style>