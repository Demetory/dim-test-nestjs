<script setup lang="ts">
// Props
defineProps({
  username: {
    type: String,
    required: true,
    validator(username: string) {
      return username.length >= 1 && username.length <= 2;
    },
  },
});
</script>

<template>
  <div class="avatar">{{ username }}</div>
</template>

<style scoped lang="scss">
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  @include font(1.6rem, 1.6rem, 500);
  color: colors.$white;
  background-color: colors.$blue-200;
  border-radius: 50%;
}
</style>
