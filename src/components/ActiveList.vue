<template>
  <section class="list">
    <div class="list__header">
      <img src="../assets/source.svg" alt="a bottle" />
      <h3>
        Didn't find what you <br />
        need?
      </h3>
      <button>Add item</button>
    </div>

    <div class="list__body">
      <h2 class="list-title">Shopping list</h2>

      <ul class="list-groups">
        <li class="group">
          <h4 class="group-title">Fruit and vegetables</h4>

          <ul class="group-items">
            <li class="group-item">
              <p class="group-item-name">Avocado</p>
              <span class="group-item-quantity">3 pcs</span>
            </li>
            <li class="group-item">
              <p class="group-item-name">Avocado</p>
              <span class="group-item-quantity">3 pcs</span>
            </li>
            <li class="group-item">
              <p class="group-item-name">Pre-cooked corn 450g</p>
              <span class="group-item-quantity">1 pcs</span>
            </li>
            <li class="group-item">
              <p class="group-item-name">Avocado</p>
              <span class="group-item-quantity">3 pcs</span>
            </li>
            <li class="group-item">
              <p class="group-item-name">Avocado</p>
              <span class="group-item-quantity">3 pcs</span>
            </li>
            <li class="group-item">
              <p class="group-item-name">Pre-cooked corn 450g</p>
              <span class="group-item-quantity">1 pcs</span>
            </li>
            <li class="group-item">
              <p class="group-item-name">Avocado</p>
              <span class="group-item-quantity">3 pcs</span>
            </li>
            <li class="group-item">
              <p class="group-item-name">Avocado</p>
              <span class="group-item-quantity">3 pcs</span>
            </li>
            <li class="group-item">
              <p class="group-item-name">Pre-cooked corn 450g</p>
              <span class="group-item-quantity">1 pcs</span>
            </li>
          </ul>
        </li>
        <li class="group">
          <h4 class="group-title">Fruit and vegetables</h4>

          <ul class="group-items">
            <li class="group-item">
              <p class="group-item-name">Avocado</p>
              <span class="group-item-quantity">3 pcs</span>
            </li>
            <li class="group-item">
              <p class="group-item-name">Pre-cooked corn 450g</p>
              <span class="group-item-quantity">1 pcs</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="list__footer">
      <form class="list__footer-form">
        <input type="text" placeholder="Enter a name" />
        <button>Save</button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ActiveList",
});
</script>

<style lang="scss" scoped>
.list {
  max-height: 100vh;
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

.group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-name {
    font-size: 1.4rem;
  }

  &-quantity {
    display: inline-block;

    color: #f9a109;
    font-weight: 700;
    font-size: 1.2rem;
    border-radius: 24px;
    padding: 0.8rem 2.3rem;
    border: 2px solid #f9a109;
  }
}

.group-item:not(:last-of-type) {
  margin-bottom: 2rem;
}

.list__footer {
  padding: 2rem;
  background: #fff;
}

.list__footer-form {
  display: flex;
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid #f9a109;

  * {
    display: inline-block;
    padding: 2rem;
  }

  input {
    flex: 1;
    border: none;
  }

  button {
    color: #fff;
    font-weight: bold;
    font-size: 1.6rem;
    background: #f9a109;
  }
}
</style>
