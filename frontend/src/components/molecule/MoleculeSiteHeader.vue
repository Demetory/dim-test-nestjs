<script setup lang="ts">
// Components
import MoleculeSiteNavi from "@/components/molecule/MoleculeSiteNavi.vue";
import OrganismUserMenu from "@/components/organism/OrganismUserMenu.vue";
</script>

<template>
  <header>
    <MoleculeSiteNavi />
    <OrganismUserMenu />
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: colors.$border;
}
</style>
