<script setup lang="ts">
// Core
import { reactive, ref } from "vue";
// Pinia
import { useStorePlans } from "@/stores/storePlans";
// Modules
import { doValidateLiteral, doValidateLiteralExt, doValidatePrice } from "@/composables/useStrings";
import { useAutofocus } from "@/composables/useAutofocus";
import { useNotify } from "@/composables/useNotify";
// Interfaces
import type { IPlanForm } from "@/types/IPlanForm";
// Components
import AtomButton from "@/components/atom/AtomButton.vue";
import AtomInput from "@/components/atom/AtomInput.vue";

// Props
const props = defineProps({
  id: {
    type: String,
    default: "none",
  },
});

// Data
const defaultData = (): IPlanForm => ({
  title: undefined,
  description: undefined,
  price: undefined,
  currency: "₽",
});

const storePlans = useStorePlans();
const loading = ref(false);
const error = ref(true);
const form = reactive<IPlanForm>(defaultData());
const mode = ref("");

// Emitter
const emit = defineEmits(["close"]);

// Methods
const getFormData = () => {
  if (props.id !== "none") {
    Object.assign(form, storePlans.getPlanBy("id", props.id));
    mode.value = "Edit";
    error.value = false;
  } else {
    mode.value = "Create";
    error.value = true;
  }

  useAutofocus();
};

const doSubmit = async () => {
  if (error.value === false && loading.value === false) {
    try {
      loading.value = true;
      if (mode.value === "Edit") {
        await storePlans.editPlan(`${props.id}`, form);
        useNotify(`Plan «${form.title}» was modified`, "done");
      } else if (mode.value === "Create") {
        await storePlans.createPlan(form);
        useNotify(`New plan created`, "done");
      }
    } catch (e) {
      if (e instanceof Error) {
        useNotify(e.toString(), "error");
      }
      throw e;
    } finally {
      loading.value = false;
      emit("close");
    }
  }
};

const isErrorInput = (payload: boolean) => {
  error.value = payload;
};

// Here we go
void getFormData();
</script>

<template>
  <section class="form">
    <p>
      <AtomInput
        id="autofocus"
        type="text"
        label="Title"
        v-model="form.title"
        :max-length="15"
        :rules="[
          (val: string) => !!val || 'Field is required',
          (val: string) => doValidateLiteral(val) === true || 'Only letters and numbers allowed',
          (val: string) => val.length >= 3 || 'Not less than 3 symbols',
          (val: string) => val.length <= 15 || 'No more than 15 symbols',
        ]"
        @is-error="isErrorInput"
      />
    </p>
    <p>
      <AtomInput
        type="text"
        label="Description"
        v-model="form.description"
        :max-length="35"
        :rules="[
          (val: string) => !!val || 'Field is required',
          (val: string) => doValidateLiteralExt(val) === true || 'Unallowed symbol',
          (val: string) => val.length >= 3 || 'Not less than 3 symbols',
          (val: string) => val.length <= 35 || 'No more than 35 symbols',
        ]"
        @is-error="isErrorInput"
      />
    </p>
    <p>
      <AtomInput
        type="text"
        label="Price"
        v-model="form.price"
        :max-length="6"
        :rules="[
          (val: string) => !!val || 'Field is required',
          (val: string) => doValidatePrice(val) === true || 'Only dot and numbers allowed',
          (val: string) => val.length <= 6 || 'No more than 6 symbols',
        ]"
        @is-error="isErrorInput"
      />
      <span>{{ form.currency }}</span>
    </p>
    <p><AtomButton label="Submit" :disabled="error" :loading="loading" @click="doSubmit" /></p>
  </section>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  width: 320px;
  user-select: none;

  p {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;

    &:not(:last-of-type) {
      margin-bottom: 16px;
    }

    span {
      position: absolute;
      right: 16px;
    }

    .atom-button {
      flex: 1;
    }
  }
}
</style>
