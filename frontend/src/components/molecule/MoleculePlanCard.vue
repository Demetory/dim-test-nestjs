<script setup lang="ts">
// Core
import { computed } from "vue";
// Interfaces
import type { IPlanItem } from "src/types/IPlanItem";
// Components
import AtomButton from "@/components/atom/AtomButton.vue";

// Props
const props = defineProps({
  data: {
    type: Object as () => IPlanItem,
    required: true,
  },
  role: {
    type: Boolean,
    default: false,
  },
});

// Emitter
const emit = defineEmits(["action"]);

const doAction = (action: string) => {
  emit("action", { action: action, id: props.data.id });
};

// Computed properties
const getPrice = computed(() => {
  return props.data.currency === "eur" ? `€${props.data.price}` : `${props.data.price} ${props.data.currency}`;
});
</script>

<template>
  <div class="card">
    <h2>
      {{ data.title }} <span>{{ getPrice }}</span>
    </h2>
    <p class="desc">{{ data.description }}</p>
    <p class="more">
      <AtomButton v-if="!$route.params.id" label="See details" @click="doAction('Goto')" />
      <AtomButton v-if="role" label="Edit" @click="doAction('Edit')" class="edit" />
      <AtomButton v-if="role" label="Delete" @click="doAction('Delete')" class="delete" />
    </p>
  </div>
</template>

<style scoped lang="scss">
.card {
  @include card;
  align-self: flex-start;
  flex: 0 1 33.3333%;
  max-width: calc(33.3333% - 16px);
  margin-right: 16px;
  margin-bottom: 16px;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background-color: colors.$white;

  &:hover {
    background-color: colors.$blue-100;
    box-shadow: none;
  }

  h2 {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    @include font(2.2rem, 2.4rem, 700);

    span {
      margin-left: auto;
      color: colors.$grey-600;
    }
  }

  .more {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 24px;

    .atom-button:not(:last-of-type) {
      margin-right: 8px;
    }

    .edit {
      margin-left: auto;
    }
  }
}
</style>
