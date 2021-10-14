<template>
  <li class="shopping-list">
    <Custom-radio
      :checked="list.active"
      @click="changeActive"
      v-show="canSetActive"
    />
    <p class="shopping-list__name">{{ list.name }}</p>
    <p class="shopping-list__date">
      <span class="material-icons"> event_note </span>
      {{ formatedDate }}
    </p>

    <span :class="['shopping-list__status', listStatusString]">
      {{ listStatusString }}
    </span>

    <button class="remove" @click="askConfirmation = true">
      <span class="material-icons"> delete_outline </span>
    </button>

    <router-link :to="`/list/${list.id}`">
      <span class="material-icons"> navigate_next </span>
    </router-link>

    <Mask v-show="askConfirmation">
      <Confirm-popup
        @confirm="remove"
        @cancel="askConfirmation = false"
        text="Are you sure that you want to cancel this list?"
      />
    </Mask>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import ListAPI from "@/services/ListAPI";
import Toast from "@/models/Toast.interface";
import ListStatus from "@/models/ListStatus.enum";
import ShoppingList from "@/models/ShoppingList.interface";

import Mask from "./Mask.vue";
import CustomRadio from "./CustomRadio.vue";
import ConfirmPopup from "./ConfirmPopup.vue";

export default defineComponent({
  name: "ShoppingList",
  components: { Mask, CustomRadio, ConfirmPopup },
  props: {
    list: {
      type: Object as PropType<ShoppingList>,
      required: true,
    },
  },
  data() {
    return {
      askConfirmation: false,
    };
  },
  computed: {
    formatedDate(): string {
      const date = new Date(this.list.date);
      const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const weekDay = weekDays[date.getDay()];

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${weekDay} ${day}.${month}.${year}`;
    },
    listStatusString(): string {
      return ListStatus[this.list.status].replace("_", " ");
    },
    canSetActive(): boolean {
      return this.list.status === ListStatus.In_Progress;
    },
    token(): string {
      return this.$store.state.userToken;
    },
  },
  methods: {
    async changeActive() {
      if (this.list.active) return;

      await ListAPI.changeActiveList(this.list.id, this.token);
      await this.$store.dispatch("getLists");
      this.$store.commit("setActiveList");
      await this.$store.dispatch("getActiveListItems");
    },
    async remove() {
      const toastConfig = {} as Toast;

      try {
        await ListAPI.deleteList(this.list.id, this.token);
        await this.$store.dispatch("getLists");

        toastConfig.error = false;
        toastConfig.message = "List deleted";
      } catch (error) {
        toastConfig.error = true;
        toastConfig.message = error.message;
      } finally {
        this.$store.commit("setToastConfig", toastConfig);
        this.$store.commit("setShowToast", true);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.shopping-list {
  display: flex;
  padding: 1rem;
  column-gap: 1rem;
  align-items: center;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);

  @media (min-width: 1200px) {
    column-gap: 2rem;
  }

  &__name {
    font-size: 1.6rem;
    line-height: 2rem;
    margin-right: auto;
  }

  &__date {
    display: none;

    @media (min-width: 1200px) {
      display: flex;
      column-gap: 1rem;
      align-items: center;

      color: #c1c1c4;
      font-size: 1.2rem;
      line-height: 1.5rem;
    }
  }

  &__status {
    padding: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    display: inline-block;

    color: #7cea9c;
    border-radius: 8px;
    white-space: nowrap;
    text-transform: lowercase;
    border: 1px solid #7cea9c;

    &.Completed {
      color: #56ccf2;
      border-color: #56ccf2;
    }

    &.Cancelled {
      color: #eb5757;
      border-color: #eb5757;
    }
  }
}

a {
  color: #f9a109;
}

.remove {
  background: 0;
  color: #eb5757;
}
</style>