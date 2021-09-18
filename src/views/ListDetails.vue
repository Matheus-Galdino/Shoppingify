<template>
  <div class="list-details page">
    <router-link class="back-button" to="/history">
      <span class="material-icons"> arrow_right_alt </span>
      back
    </router-link>

    <h1 class="list-details__name">{{ list.name }}</h1>
    <p class="list-details__date">
      <span class="material-icons"> event_note </span>
      {{ formatedDate }}
    </p>

    <ul class="list-groups">
      <li class="group" v-for="(group, index) in itemGroups" :key="index">
        <h4 class="group-title">{{ group.key }}</h4>

        <ul class="group-items">
          <li class="group-item" v-for="item in group.items" :key="item.id">
            <p class="group-item__name">{{ item.item.name }}</p>
            <span class="group-item__quantity">{{ item.quantity }} pcs</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import API from "@/API";
import Group from "@/models/Group.interface";
import ShoppingList from "@/models/ShoppingList.interface";
import ShoppingListItem from "@/models/ShoppingListItem.interface";

export default defineComponent({
  name: "ListDetails",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      itemGroups: [] as Group<ShoppingListItem>[],
    };
  },
  methods: {
    async getListItems(id: number) {
      const groups = await API.getListItems(id);
      this.itemGroups = groups;
    },
  },
  computed: {
    list(): ShoppingList {
      return this.$store.getters.getList(Number(this.id));
    },
    formatedDate(): string {
      const date = new Date(this.list.date);
      const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const weekDay = weekDays[date.getDay()];

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${weekDay} ${day}.${month}.${year}`;
    },
  },
  async beforeMount() {
    await this.getListItems(Number(this.id));
  },
  async beforeRouteUpdate(to, from, next) {
    const id = Number(to.params.id);
    await this.getListItems(id);

    next();
  },
});
</script>

<style lang="scss" scoped>
.list-details {  

  &__name {
    color: #34333a;
    font-size: 2.6rem;
    line-height: 3.2rem;
    margin-bottom: 1rem;
  }

  &__date {
    display: flex;
    column-gap: 1rem;
    align-items: center;

    color: #c1c1c4;
    font-size: 1.2rem;
    line-height: 1.5rem;
    margin-bottom: 3rem;
  }
}

.back-button {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  cursor: pointer;
  color: #f9a109;
  font-weight: bold;
  font-size: 1.4rem;
  text-decoration: none;

  .material-icons {
    color: #f9a109;
    margin-right: 6px;
    transform: rotate(180deg);
  }
}

.group {
  margin-bottom: 3rem;
}

.group-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

.group-items {
  display: flex;
  row-gap: 2rem;
  flex-wrap: wrap;
  column-gap: 1rem;
  align-items: center;
}

.group-item {
  flex: 1;
  display: flex;
  column-gap: 2rem;
  align-items: center;
  justify-content: space-between;

  max-width: 200px;
  min-width: 150px;

  padding: 1.3rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);

  &__name {
    flex-grow: 1;
    font-size: 1.4rem;
  }

  &__quantity {
    font-size: 12px;
    color: #f9a10a;
    font-weight: bold;
  }
}
</style>