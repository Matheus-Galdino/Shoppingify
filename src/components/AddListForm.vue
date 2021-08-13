<template>
  <form class="add-list-form" @submit.prevent="saveList">
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="list.name" required />

    <label for="date">Date:</label>
    <input type="date" id="date" v-model="list.date" :min="today" required />

    <div class="add-list-form__footer">
      <button class="cancel" type="button" @click="$emit('close')">
        Cancel
      </button>
      <button>Save</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ShoppingList from "@/models/ShoppingList.interface";
import API from "@/API";
import Toast from "@/models/Toast.interface";

export default defineComponent({
  name: "AddListForm",
  data() {
    return {
      list: {} as ShoppingList,
    };
  },
  methods: {
    async saveList() {
      const toastConfig = {} as Toast;

      try {
        await API.SaveList(this.list);
        this.$store.dispatch("getLists");

        toastConfig.error = false;
        toastConfig.message = "List created";
        this.$emit("close");
      } catch (error) {
        toastConfig.error = true;
        toastConfig.message = error.message;
      } finally {
        this.$store.commit("setToastConfig", toastConfig);
        this.$store.commit("setShowToast", true);
      }
    },
  },
  computed: {
    today() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const monthString = month < 10 ? "0" + month : month;
      const day = date.getDate();
      const dayString = day < 10 ? "0" + day : day;

      return `${year}-${monthString}-${dayString}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.add-list-form {
  width: 90vw;
  max-width: 600px;

  padding: 2rem;
  background: #fff;
  border-radius: 15px;

  label {
    display: block;
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 1rem;
    margin-bottom: 1rem;
    display: inline-block;

    width: 100%;
    font-size: 1.5rem;
    border-radius: 10px;
    border: 2px solid #bdbdbd;

    &:focus {
      border-color: #f9a109;
    }
  }

  &__footer {
    display: flex;
    margin-top: 1rem;
    justify-content: flex-end;

    button {
      color: #fff;
      padding: 2rem 4rem;
      border-radius: 12px;
      display: inline-block;
      background: #f9a109;

      &.cancel {
        color: #000;
        padding: 2rem;
        background: #fff;
      }
    }
  }
}
</style>