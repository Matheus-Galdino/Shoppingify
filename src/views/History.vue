<template>
  <div class="history page">
    <div class="history__header">
      <h1>Shopping history</h1>
      <button class="add" @click="showForm = true">
        Add new <span class="material-icons"> add </span>
      </button>
    </div>
    <ul class="lists">
      <Shopping-list :list="list" v-for="list in lists" :key="list.id" />
    </ul>

    <Mask v-show="showForm">
      <Add-List-Form @close="showForm = false"/>
    </Mask>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Mask from "@/components/Mask.vue";
import AddListForm from "@/components/AddListForm.vue";
import ShoppingList from "@/components/ShoppingList.vue";

export default defineComponent({
  name: "History",
  components: { ShoppingList, Mask, AddListForm },
  data() {
    return {
      showForm: false,
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
});
</script>

<style lang="scss" scoped>
.history {

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 3rem;
  }

  h1 {
    color: #34333a;
    font-size: 2.6rem;
    line-height: 3.2rem;
  }

  .add {
    display: flex;
    column-gap: 0.3rem;
    align-items: center;

    background: 0;
    color: #56ccf2;
  }
}

.lists {
  display: flex;
  row-gap: 2rem;
  flex-direction: column;
}
</style>
