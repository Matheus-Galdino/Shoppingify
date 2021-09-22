<template>
  <form @submit.prevent="signup">
    <h1 class="title">Create Account</h1>

    <CustomInput
      id="name"
      label="Name"
      placeholder="Name"
      v-model="user.name"
    />

    <CustomInput
      id="email"
      type="email"
      label="Email"
      v-model="user.email"
      placeholder="email@example.com"
    />

    <CustomInput
      id="password"
      type="password"
      label="Password"
      v-model="user.password"
      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
    />

    <CustomInput
      type="password"
      id="confirmPassword"
      label="Confirm password"
      v-model="confirmPassword"
      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
    />

    <div class="action-group">
      <button>Sign up</button>
      <router-link to="/auth/login">Sign in</router-link>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import API from "@/API";
import User from "@/models/User.interface";

import CustomInput from "@/components/CustomInput.vue";

export default defineComponent({
  name: "Signup",
  components: { CustomInput },
  data() {
    return {
      user: {} as User,
      confirmPassword: "",
    };
  },
  methods: {
    async signup() {
      const token = await API.Signup(this.user);
      this.$store.commit("setToken", token);
      sessionStorage.setItem("token", token);
      this.$router.push("/");
    },
  },
});
</script>

<style>
</style>