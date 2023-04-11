<script setup lang="ts">
// Core
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
// Pinia
import { useStoreAuth } from "@/stores/storeAuth";
// Components
import AtomAvatar from "@/components/atom/AtomAvatar.vue";

// Data
const router = useRouter();
const storeAuth = useStoreAuth();
const isDropdown = ref(false);

// Computed properties
const getUserName = computed(() => {
  return `${storeAuth.user.name_first} ${storeAuth.user.name_last}`;
});

const getUserRole = computed(() => {
  return storeAuth.user.role === "admin" ? "Administrator" : "User";
});

const getAvatar = computed(() => {
  let avatar = "";
  if (storeAuth.user.name_first) {
    avatar += Array.from(storeAuth.user.name_first)[0];
  }
  if (storeAuth.user.name_last) {
    avatar += Array.from(storeAuth.user.name_last)[0];
  }
  return avatar.toUpperCase();
});

// Methods
const switchDropdown = () => {
  isDropdown.value = !isDropdown.value;
};

const closeDropdown = () => {
  if (isDropdown.value) {
    isDropdown.value = false;
  }
};

const doLogout = async () => {
  closeDropdown();
  const response = await storeAuth.doLogout();
  if (response) {
    router.push({ name: "PageLogin" });
  }
};

// Hoox
onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <section class="user" @click.stop="switchDropdown">
    <div class="user__name">
      <p>{{ getUserName }}</p>
      <p>{{ getUserRole }}</p>
    </div>
    <AtomAvatar :username="getAvatar" />
    <div v-show="isDropdown" class="user__dropdown" @click.stop="doLogout">Logout</div>
  </section>
</template>

<style scoped lang="scss">
.user {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  padding: 1rem 2rem;
  transition: background-color 0.3s ease-in-out;
  border: colors.$border;
  border-radius: calc(colors.$border-radius/2);
  cursor: pointer;

  &:hover {
    background-color: colors.$grey-200;
  }

  &__name {
    margin-right: 16px;

    p {
      text-align: end;
      &:first-of-type {
        padding-bottom: 6px;
        @include font(1.6rem, 1.6rem, 500);
      }
      &:last-of-type {
        @include font(1.4rem, 1.4rem, 400);
        color: colors.$grey-500;
      }
    }
  }

  &__dropdown {
    z-index: 2;
    position: absolute;
    right: 0;
    top: 100%;
    display: inline-flex;
    padding: 16px 32px;
    @include bordered;
    border-radius: calc(colors.$border-radius/2);
    background-color: colors.$white;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);

    &:hover {
      color: colors.$white;
      background-color: colors.$blue-400;
    }
  }
}
</style>
