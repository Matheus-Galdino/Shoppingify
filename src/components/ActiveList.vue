<template>
  <aside class="list">
    <div class="list__header">
      <img src="../assets/source.svg" alt="a bottle" />
      <h3>
        Didn't find what you <br />
        need?
      </h3>
      <button @click="$emit('change-aside', 'AddItem')">Add item</button>
    </div>

    <template v-if="activeList?.items?.length >= 1">
      <div class="list__body">
        <h2 class="list-title">
          {{ activeList.name }}
          <span class="material-icons" @click="isEditing = !isEditing">
            edit
          </span>
        </h2>

        <ul class="list-groups">
          <li
            class="group"
            v-for="(group, index) in activeList?.items"
            :key="index"
          >
            <h4 class="group-title">{{ group.key }}</h4>

            <ul class="group-items">
              <Shopping-list-item
                :key="item.id"
                :item="item.item"
                class="group-item"
                v-for="item in group.items"
              >
                <Edit-quantity
                  :itemQuantity="item.quantity"
                  @delete="removeItem(item.item.id)"
                  @confirm="updateQuantity(item.item.id, $event)"
                />
              </Shopping-list-item>
            </ul>
          </li>
        </ul>
      </div>

      <transition name="slide-up">
        <footer class="list__footer" v-if="isEditing && !isInStats">
          <form class="list__footer-form">
            <input type="text" placeholder="Enter a name" />
            <button class="button">Save</button>
          </form>
        </footer>
        <footer class="list__footer" v-else-if="isInStats">
          <button class="button cancel" @click="changeListStatus(false)">
            cancel
          </button>

          <button class="button complete" @click="changeListStatus(true)">
            Complete
          </button>
        </footer>
      </transition>
    </template>

    <div class="empty-list" v-else>
      <h2>No items</h2>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import API from "@/API";
import Toast from "@/models/Toast.interface";
import EditQuantity from "./EditQuantity.vue";
import ShoppingListItem from "./ShoppingListItem.vue";
import ListStatus from "@/models/ListStatus.enum";

export default defineComponent({
  name: "ActiveList",
  components: { EditQuantity, ShoppingListItem },
  data() {
    return {
      isEditing: false,
      toastConfig: {} as Toast,
    };
  },
  methods: {
    async updateQuantity(itemId: number, quantity: number) {
      const listId = this.activeList.id;

      try {
        await API.changeListItemQuantity(listId, itemId, quantity);

        this.toastConfig.error = false;
        this.toastConfig.message = "Quantity updated";
      } catch (error) {
        this.toastConfig.error = true;
        this.toastConfig.message = error.message;
      } finally {
        this.$store.commit("setToastConfig", this.toastConfig);
        this.$store.commit("setShowToast", true);
      }
    },
    async removeItem(itemId: number) {
      const listId = this.activeList.id;

      await API.removeItemFromList(listId, itemId);
      this.$store.dispatch("getActiveListItems");

      this.toastConfig.error = false;
      this.toastConfig.message = "Item removed";
      this.$store.commit("setToastConfig", this.toastConfig);
      this.$store.commit("setShowToast", true);
    },
    async changeListStatus(complete: string) {
      const listId = this.$store.state.activeList.id;
      const listStatus = complete ? ListStatus.Completed : ListStatus.Cancelled;

      if (listStatus == ListStatus.Cancelled) {
        const ask = confirm("Are you sure that you want to cancel this list?");

        if (!ask) return;
      }

      await API.changeListStatus(listId, listStatus);

      await this.$store.dispatch("getLists");

      this.$store.commit("setActiveList");

      if (!this.$store.state.activeList?.id) return;

      await this.$store.dispatch("getActiveListItems");
    },
  },
  computed: {
    activeList() {
      return this.$store.state.activeList;
    },
    isInStats() {
      const routeName = this.$route.name?.toString();
      return routeName === "Stats";
    },
  },
});
</script>

<style lang="scss" scoped>
.list {
  height: 100vh;
  max-width: 500px;
  background: #fff0de;

  display: grid;
  grid-template-rows: auto 1fr auto;
}

.list__header {
  position: relative;

  margin: 3rem;
  padding: 2rem;
  padding-left: 40%;
  border-radius: 24px;
  background: #80485b;

  img {
    position: absolute;
    top: 0;
    left: 15px;
    transform: translateY(-20px);
  }

  * {
    font-weight: 700;
  }

  h3 {
    color: #fff;
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  button {
    display: inline-block;

    font-size: 1.4rem;
    padding: 1rem 3rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  }
}

.list__body {
  padding: 0 3rem;
  overflow-y: auto;
}

.list-title {
  font-weight: 700;
  color: #34333a;
  font-size: 2.4rem;
  margin-bottom: 4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .material-icons {
    cursor: pointer;
  }
}

.group:not(:last-of-type) {
  margin-bottom: 4rem;
}

.group {
  &-title {
    color: #828282;
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }
}

.group-item:not(:last-of-type) {
  margin-bottom: 2rem;
}

.list__footer {
  display: flex;
  justify-content: center;

  padding: 2rem;
  background: #fff;
}

.list__footer-form {
  flex: 1;
  display: flex;
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid #f9a109;

  input {
    flex: 1;
    border: none;
    padding: 2rem;
    display: inline-block;
  }

  button {
    background: #f9a109;
  }
}

.button {
  color: #fff;
  padding: 2rem;
  font-weight: bold;
  font-size: 1.6rem;
  display: inline-block;

  &.complete,
  &.cancel {
    border-radius: 12px;
  }

  &.complete {
    background: #56ccf2;
  }

  &.cancel {
    color: #000;
    background: 0;
  }
}

.empty-list {
  display: grid;
  place-content: center;
  background: url("../assets/shopping.svg") no-repeat;
  background-position: center bottom;

  h2 {
    font-size: 2rem;
    font-weight: bold;

    color: #34333a;
  }
}

.slide-up-enter-active {
  animation: slide-up 0.1s ease-in;
}

.slide-up-leave-active {
  animation: slide-up 0.1s ease-in reverse;
}

@keyframes slide-up {
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
