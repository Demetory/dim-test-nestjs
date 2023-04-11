<script setup lang="ts">
// Core
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
// Pinia
import { useStoreAuth } from "@/stores/storeAuth";
import { useStorePlans } from "@/stores/storePlans";
// Modules
import { useNotify } from "@/composables/useNotify";
// Interfaces
import type { IPlanItem } from "src/types/IPlanItem";
// Components
import AtomButton from "@/components/atom/AtomButton.vue";
import AtomSpinner from "@/components/atom/AtomSpinner.vue";
import MoleculeModal from "@/components/molecule/MoleculeModal.vue";
import MoleculePlanCard from "@/components/molecule/MoleculePlanCard.vue";
import OrganismFormPlan from "@/components/organism/OrganismFormPlan.vue";

// Data
const route = useRoute();
const router = useRouter();
const storePlans = useStorePlans();
const storeAuth = useStoreAuth();
const plan = ref<IPlanItem | null>();
const id = ref("none");
const loading = ref(false);
const isModal = ref(false);

// Watch
watch(
  () => route.params.id,
  () => {
    if (route.params.id && typeof route.params.id === "string") {
      const id = parseInt(route.params.id);
      const result = storePlans.plans.find((obj) => obj.id === id);
      if (result) {
        plan.value = result;
      } else {
        router.push({ name: "PageNotFound" });
      }
    } else {
      plan.value = null;
    }
  },
  { immediate: true }
);

// Computed properties
const getHeader = computed(() => {
  return plan.value ? `Our cool plan «${plan.value.title}»` : `Our cool plans`;
});

const getPlans = computed(() => {
  return storePlans.plans;
});

const getPlansLength = computed(() => {
  return storePlans.plans.length;
});

const getRole = computed(() => {
  return storeAuth.user.role === "admin" ? true : false;
});

const getState = computed(() => {
  let state = "";
  if (loading.value === true && getPlansLength.value === 0) {
    state = "loading";
  } else if (loading.value === false && getPlansLength.value === 0) {
    state = "empty";
  } else if (loading.value === false && getPlansLength.value > 0) {
    state = "ready";
  }
  return state;
});

// Methods
const doFetchPlans = async () => {
  try {
    loading.value = true;
    await storePlans.getPlans();
  } catch (e) {
    if (e instanceof Error) {
      useNotify(e.toString(), "error");
    }
    throw e;
  } finally {
    loading.value = false;
  }
};

const doAction = (payload: { action: string; id?: number }) => {
  if (payload.action === "Goto") {
    router.push({ path: `/plans/${payload.id}` });
  } else if (payload.action === "Add") {
    id.value = "none";
    switchModal();
  } else if (payload.action === "Edit") {
    if (payload.id) {
      id.value = payload.id.toString();
      switchModal();
    }
  } else if (payload.action === "Delete") {
    if (payload.id) {
      let id = payload.id.toString();
      storePlans.deletePlan(id);
      router.push({ name: "PagePlans" });
    }
  }
  doFetchPlans();
};

const switchModal = () => {
  doFetchPlans();
  isModal.value = !isModal.value;
};

// Here we go
void doFetchPlans();
</script>

<template>
  <section class="megaplan">
    <header>
      {{ getHeader }}
      <template v-if="plan">
        <AtomButton v-if="getRole" label="Edit" @click="doAction({ action: 'Edit', id: plan?.id })" />
        <AtomButton v-if="getRole" label="Delete" @click="doAction({ action: 'Delete', id: plan?.id })" />
      </template>
      <template v-else>
        <AtomButton v-if="getRole" label="Add" @click="doAction({ action: 'Add' })" />
      </template>
    </header>

    <article>
      <template v-if="getState === 'loading'">
        <div class="centered">
          <AtomSpinner preset="tertiary" size="large" mode="progressive" />
          <h1 class="centered">Fetching data</h1>
        </div>
      </template>
      <template v-else-if="getState === 'empty'">
        <div class="centered">
          <h1>No plans were found</h1>
          <p>But You can <a name="add" @click.stop="doAction({ action: 'Add' })">create one manualy</a></p>
        </div>
      </template>
      <template v-else-if="getState === 'ready'">
        <MoleculePlanCard v-for="plan in getPlans" :key="plan.id" :data="plan" :role="getRole" @action="doAction" />
      </template>
    </article>

    <MoleculeModal :open="isModal" title="Create new plan" @close="switchModal">
      <OrganismFormPlan :id="id" @close="switchModal" />
    </MoleculeModal>
  </section>
</template>

<style scoped lang="scss">
.megaplan {
  display: flex;
  flex-direction: column;
  flex: 1;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: colors.$border;
    @include font(2.8rem, 2.8rem, 700);

    .atom-button:first-of-type {
      margin-left: auto;
      margin-right: 8px;
    }
  }

  article {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    margin-right: -16px;
    overflow-y: auto;

    .centered {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;

      .atom-spinner {
        margin-bottom: 16px;
      }

      h1 {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
