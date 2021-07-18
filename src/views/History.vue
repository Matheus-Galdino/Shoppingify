<template>
  <div class="history">
    <h1>Hello from history</h1>
    <div v-for="list in lists" :key="list.id">
      {{ list.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "History",
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
});
</script>
