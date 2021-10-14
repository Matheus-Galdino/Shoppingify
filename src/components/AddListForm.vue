<template>
  <form class="add-list-form" @submit.prevent="saveList">
    <CustomInput id="name" label="Name:" v-model.trim="list.name" />

    <CustomInput
      id="date"
      label="Date:"
      type="date"
      :min="today"
      v-model="list.date"
    />

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

import ListAPI from "@/services/ListAPI";
import Toast from "@/models/Toast.interface";
import ShoppingList from "@/models/ShoppingList.interface";

import CustomInput from "./CustomInput.vue";

export default defineComponent({
  name: "AddListForm",
  components: { CustomInput },
  data() {
    return {
      list: {} as ShoppingList,
    };
  },
  methods: {
    async saveList() {
      const toastConfig = {} as Toast;

      try {
        await ListAPI.SaveList(this.list, this.token);
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
    token(): string {
      return this.$store.state.userToken;
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