<script setup lang="ts">
// Core
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// Pinia
import { useStoreAuth } from "@/stores/storeAuth";
// Modules
import { doValidateLiteral } from "@/composables/useStrings";
import { useAutofocus } from "@/composables/useAutofocus";
import { useNotify } from "@/composables/useNotify";
// Interfaces
import type { ILoginForm } from "src/types/ILoginForm";
// Components
import AtomButton from "@/components/atom/AtomButton.vue";
import AtomInput from "@/components/atom/AtomInput.vue";

// Data
const router = useRouter();
const storeAuth = useStoreAuth();
const loading = ref(false);
const error = ref(true);
const form = reactive<ILoginForm>({
  login: "",
  password: "",
});

// Methods
const isErrorInput = (payload: boolean) => {
  error.value = payload;
};

const doSubmit = () => {
  useNotify("Loggin in", "done");
};

// Here we go
useAutofocus();
</script>

<template>
  <section class="form">
    <h1>Please, introduce yourself</h1>
    <p>
      <AtomInput
        id="autofocus"
        type="text"
        label="Login"
        v-model="form.login"
        :max-length="15"
        :rules="[
          (val: string) => !!val || 'Field is required',
          (val: string) => doValidateLiteral(val) === true || 'Only letters and numbers allowed',
          (val: string) => val.length >= 3 || 'Not less than 3 symbols',
          (val: string) => val.length <= 15 || 'No more than 15 symbols',
        ]"
      />
    </p>
    <p>
      <AtomInput
        type="password"
        label="Password"
        v-model="form.password"
        :rules="[
          (val: string) => !!val || 'Field is required',
          (val: string) => doValidateLiteral(val) === true || 'Only letters and numbers allowed',
          (val: string) => val.length >= 3 || 'Not less than 3 symbols',
          (val: string) => val.length <= 15 || 'No more than 15 symbols',
        ]"
        @is-error="isErrorInput"
      />
    </p>
    <p><AtomButton label="Submit" :disabled="error" :loading="loading" @click="doSubmit" /></p>
    <p>Forgot the Password? It's a pity.</p>
  </section>
</template>

<style scoped lang="scss">
.form {
  @include card;
  margin: auto auto;
  width: 320px;
  user-select: none;

  h1 {
    @include card-head;
  }

  p:not(:last-of-type) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;

    .atom-button {
      flex: 1;
    }

    &.error {
      color: colors.$red-100;
    }
  }

  p:last-of-type {
    margin-top: 16px;
    @include font(1.3rem, 1.3rem, 400);
  }
}
</style>
