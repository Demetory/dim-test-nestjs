<script setup lang="ts">
// Core
import { computed, ref } from "vue";

// Props
const props = defineProps({
  type: {
    type: String,
    default: "text",
    validator(type: string) {
      return ["text", "password"].includes(type);
    },
  },
  label: {
    type: String,
    required: true,
    default: "Забытый лейбл",
    validator(label: string) {
      return label.length > 3;
    },
  },
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
  maxLength: {
    type: Number,
    default: 15,
  },
  rules: {
    type: Array,
  },
});

// Data
const isError = ref(false);
const errorMsg = ref("");

// Emitter
const emit = defineEmits(["update:modelValue", "isError"]);

const updateValue = (e: Event) => {
  let value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", value);

  if (typeof props.rules === "object") {
    for (let i = 0; i < props.rules.length; i++) {
      let rule = props.rules[i] as Function;
      if (typeof rule !== "function") {
        throw Error("Rule is not a Function");
      }

      let result = rule(value);
      if (result !== true) {
        isError.value = true;
        errorMsg.value = result;
        emit("isError", isError.value);
        return false;
      } else {
        isError.value = false;
        errorMsg.value = "";
        emit("isError", isError.value);
      }
    }
  }
};

// Computed properties
const classes = computed(() => {
  return {
    "atom-input": true,
    [`atom-input--${props.type}`]: true,
    "atom-input--error": isError.value,
  };
});

const computedLabel = computed(() => {
  return isError ? `${props.label}: ${errorMsg.value}` : props.label;
});
</script>

<template>
  <div :class="classes">
    <input :type="type" placeholder=" " :value="modelValue" @input="updateValue" :maxlength="maxLength" />
    <label>{{ computedLabel }}</label>
  </div>
</template>

<style scoped lang="scss">
.atom-input {
  position: relative;
  display: flex;
  flex: 1;
  height: 40px;
  max-height: 40px;

  input[type="text"],
  input[type="password"] {
    z-index: 2;
    position: relative;
    display: flex;
    flex: 1;
    box-sizing: border-box;
    padding: 9px 16px;
    height: 40px;
    max-height: 40px;
    @include font(1.6rem, 2.2rem, 400);
    border: none;
    border-radius: calc(colors.$border-radius / 2);
    color: colors.$black;
    outline: 0;
    background: transparent;
    box-shadow: 0px 0px 0px 1px colors.$grey-400;
    transition: box-shadow 0.3s ease, padding 0.3s ease;

    &:focus {
      box-shadow: 0px 0px 0px 2px colors.$blue-400;
    }

    &:focus,
    &:not(:placeholder-shown) {
      padding: 15px 16px 3px 16px;
    }
  }

  label {
    z-index: 1;
    position: absolute;
    top: calc(50% - 1rem);
    padding: 0 16px;
    line-height: 40px;
    @include font(1.4rem, 2rem, 400);
    color: colors.$grey-500;
    transition: all 0.3s ease;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    top: 3px;
    @include font(1.2rem, 1.2rem, 400);
  }

  &--error {
    input[type="text"],
    input[type="password"] {
      color: colors.$red-100;
      box-shadow: 0px 0px 0px 1px colors.$red-100;

      &:focus {
        box-shadow: 0px 0px 0px 2px colors.$red-100;
      }
    }

    label {
      color: colors.$red-100;
    }
  }
}
</style>
