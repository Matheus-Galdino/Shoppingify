<template>
  <div :class="containerStyle" @click="isEditing = true">
    <button class="delete" v-show="isEditing" @click="$emit('delete')">
      <span class="material-icons"> delete_outline </span>
    </button>

    <button class="confirm" v-show="isEditing" @click.stop="confirm">
      <span class="material-icons"> check_circle </span>
    </button>

    <span class="material-icons icon" v-show="isEditing" @click="decrease">
      remove
    </span>

    <span class="quantity">{{ quantity }} pcs</span>

    <span class="material-icons icon" v-show="isEditing" @click="increase">
      add
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditQuantity",
  props: {
    itemQuantity: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      quantity: this.itemQuantity,
    };
  },
  methods: {
    increase() {
      this.quantity++;
    },
    decrease() {
      if (this.quantity - 1 > 0) {
        this.quantity--;
        return;
      }

      //confirm deletion of item
      const result = confirm("Are you sure you want to delete this item?");
      if (result) this.$emit("delete");
    },
    confirm() {
      this.isEditing = false;
      this.$emit("confirm", this.quantity);
    },
  },
  computed: {
    containerStyle(): Record<string, boolean> {
      return {
        active: this.isEditing,
        "quantity-container": true,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.quantity-container {
  display: flex;

  &.active {
    cursor: default;
    overflow: hidden;
    background: #fff;
    border-radius: 12px;
  }
}

.delete,
.confirm {
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  padding: 0.5rem;
  background: #f9a109;
}

.quantity {
  display: inline-block;

  color: #f9a109;
  font-weight: 700;
  font-size: 1.2rem;

  cursor: pointer;
  margin: 1rem 0;
  border-radius: 24px;
  padding: 0.8rem 2.3rem;
  border: 2px solid #f9a109;
}

.icon {
  cursor: pointer;
  font-size: 2rem;
  color: #f9a109;
  align-self: center;

  margin: 0 1rem;
}
</style>