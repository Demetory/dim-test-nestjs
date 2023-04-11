<script setup lang="ts">
// Core
import { computed } from "vue";
// Modules
import { iconsUI } from "@/modules/icons";

// Props
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "medium",
    validator(size: string) {
      return ["small", "medium", "large", "responsive"].includes(size);
    },
  },
  color: {
    type: String,
    default: "primary",
    validator(color: string) {
      return ["primary", "secondary"].includes(color);
    },
  },
});

// Computed Properties
const classes = computed(() => {
  return {
    "atom-icon": true,
    [`atom-icon--${props.color}`]: true,
    [`atom-icon--${props.size}`]: true,
  };
});

const getIcon = computed(() => {
  // @ts-expect-error: Any for component
  const icon = iconsUI[props.name];
  if (!icon) {
    throw Error(`Invalid required prop "icon" (${props.name} given)`);
  }
  if (typeof icon !== "object") {
    throw Error(`Prop "name" (${props.name}) is not a component`);
  }

  return icon;
});
</script>

<template>
  <i :class="classes">
    <component :is="getIcon" />
  </i>
</template>

<style scoped lang="scss">
.atom-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  &--large {
    width: 32px;
    height: 32px;
  }
  &--medium {
    width: 24px;
    height: 24px;
  }
  &--small {
    width: 18px;
    height: 18px;
  }
  &--responsive {
    width: 100%;
    height: 100%;
  }

  :deep(svg) {
    display: inline-flex;
    width: 100%;
    height: 100%;
    will-change: fill;

    path {
      transition: fill colors.$transition;
    }
  }

  &--primary {
    :deep(svg) {
      path {
        fill: colors.$blue-400;
      }
    }

    &:hover {
      :deep(svg path) {
        fill: colors.$black;
      }
    }
  }

  &--secondary {
    :deep(svg) {
      path {
        fill: colors.$black;
      }
    }
  }
}
</style>
