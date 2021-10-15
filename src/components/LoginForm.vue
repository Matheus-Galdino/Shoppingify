<template>
  <form @submit.prevent="signIn">
    <h1 class="title">Sign In</h1>

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

    <CustomCheckbox
      id="keepConnected"
      label="Keep connected"
      v-model="keepConnected"
    />

    <div class="action-group">
      <button>Sign in</button>
      <router-link to="/auth">Sign up</router-link>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { User } from "@/models";
import AuthAPI from "@/services/AuthAPI";

import CustomInput from "@/components/CustomInput.vue";
import CustomCheckbox from "@/components/CustomCheckbox.vue";

export default defineComponent({
  name: "LoginForm",
  components: { CustomInput, CustomCheckbox },
  data() {
    return {
      user: {} as User,
      keepConnected: false,
    };
  },
  methods: {
    async signIn() {
      const { token, userHash } = await AuthAPI.Signin(this.user, this.keepConnected);

      if(userHash){
        localStorage.setItem("userHash", userHash);
      }

      this.$store.commit("setToken", token);
      sessionStorage.setItem("token", token);
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.checkbox-container {
  margin-top: 1rem;
}
</style>