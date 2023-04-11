<script setup lang="ts">
// Pinia
import { useStoreAuth } from "@/stores/storeAuth";
// Components
import MoleculeSiteHeader from "@/components/molecule/MoleculeSiteHeader.vue";

// Data
const storeAuth = useStoreAuth();
</script>

<template>
  <MoleculeSiteHeader v-if="storeAuth.user.role" />

  <RouterView v-slot="{ Component }">
    <main :class="`page ${String($route.name)}`">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </main>
  </RouterView>

  <footer>2023 &copy; <a href="https://demetrey.ru" target="_blank">Demetory</a></footer>
</template>
