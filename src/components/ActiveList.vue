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
  height: 100vh;
  max-width: 500px;
  background: #fff0de;
  padding: 3rem 1.5rem 0;
}

.list__header {
  position: relative;

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
</style>