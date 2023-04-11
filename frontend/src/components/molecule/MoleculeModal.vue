<script setup lang="ts">
// Core
import { onMounted, onBeforeUnmount } from "vue";
// Components
import AtomIcon from "@/components/atom/AtomIcon.vue";

// Props
const props = defineProps({
  title: {
    type: [String],
  },
  open: {
    type: Boolean,
    default: false,
  },
});

// Emitter
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close", false);
};

// Methods
const doEscape = (evt: KeyboardEvent) => {
  if (props.open === true && evt.key === "Escape") {
    closeModal();
  }
};

// Hoox
onMounted(() => {
  document.addEventListener("keyup", doEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener("keyup", doEscape);
});
</script>

<template>
  <transition name="fade" mode="out-in">
    <section name="modal" v-if="open" @click.self.stop="closeModal">
      <div class="modal">
        <header class="modal__header">
          <h3 v-if="title?.length">
            {{ title }}
          </h3>
          <slot v-else name="title" />
          <AtomIcon name="close" @click.stop="closeModal" />
        </header>
        <article class="modal__body">
          <slot />
        </article>
      </div>
    </section>
  </transition>
</template>

<style scoped lang="scss">
section {
  z-index: 999999999999999999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: colors.$grey-700;

  .modal {
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 16px);
    max-height: calc(100% - 16px);
    user-select: none;

    &__header {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      flex: 1;
      align-items: center;
      padding: 12px 16px;
      border-bottom: colors.$border;
      background-color: colors.$blue-100;
      @include bordered-top;

      h3 {
        display: inline-flex;
        margin-right: 16px;
        @include font(2rem, 2rem, 700);
        color: colors.$black;
      }

      .atom-icon {
        margin-left: auto;
        cursor: pointer;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      padding: 12px 16px;
      background-color: colors.$white;
      @include bordered-bottom;
    }
  }
}
</style>
