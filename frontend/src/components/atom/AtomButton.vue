<script setup lang="ts">
// Core
import { computed } from "vue";
// Components
import AtomSpinner from "@/components/atom/AtomSpinner.vue";

// Props
const props = defineProps({
  label: String,
  preset: {
    type: String,
    default: "primary",
    validator(preset: string) {
      return ["primary", "secondary"].includes(preset);
    },
  },
  size: {
    type: String,
    default: "medium",
    validator(size: string) {
      return ["small", "medium"].includes(size);
    },
  },
  disabled: Boolean,
  loading: Boolean,
});

// Emitter
const emit = defineEmits(["click"]);

const onClick = (e: Event) => {
  emit("click", (e.target as HTMLInputElement).value);
};

// Computed properties
const classes = computed(() => {
  return {
    "atom-button": true,
    [`atom-button--${props.preset}`]: true,
    [`atom-button--${props.size}`]: true,
    "atom-button--loading": props.loading,
  };
});

const isDisabled = computed(() => {
  return props.loading || props.disabled;
});
</script>

<template>
  <button type="button" :class="classes" @click.stop="onClick" :disabled="isDisabled">
    <AtomSpinner v-if="loading" :preset="preset" :size="size" />
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
.atom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: calc(colors.$border-radius / 2);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  outline: 0;
  user-select: none;

  &--primary:not(:disabled) {
    color: colors.$white;
    background-color: colors.$blue-400;

    &:hover {
      background-color: colors.$blue-500;
    }
    &:active {
      background-color: colors.$blue-700;
    }
  }

  &--secondary:not(:disabled) {
    color: colors.$black;
    background-color: colors.$grey-200;

    &:hover {
      background-color: colors.$grey-300;
    }
    &:active {
      background-color: colors.$grey-400;
    }
  }

  &--medium {
    @include font(1.4rem, 2rem, 500);
    padding: 10px 16px;
  }

  &--small {
    @include font(1.4rem, 2rem, 500);
    padding: 6px 16px;
  }

  &--loading {
    cursor: default;
  }

  &--loading.atom-button--primary {
    color: colors.$white;
    background-color: colors.$blue-400;
  }
  &--loading.atom-button--secondary {
    color: colors.$black;
    background-color: colors.$grey-200;
  }

  &:disabled:not(&--loading) {
    color: colors.$white;
    background-color: colors.$grey-500;
    cursor: default;
  }

  .atom-icon {
    margin-right: 8px;
  }

  .atom-spinner {
    margin-right: 10px;
  }
}
</style>
