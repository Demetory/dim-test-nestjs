// Core
import { ref, readonly } from "vue";
import { defineStore } from "pinia";
// Modules
import { sortBy } from "@/composables/useObjects";
import * as fetch from "@/composables/useFetch";
// Interfaces
import type { IPlanForm } from "@/types/IPlanForm";
import type { IPlanItem } from "@/types/IPlanItem";

// Data
const api = import.meta.env.VITE_API_URL + "/plans";

// Store
const useStorePlans = defineStore("storePlans", () => {
  // State
  const plans = ref<IPlanItem[]>([]);

  // Methods
  const getPlans = async () => {
    const response = await fetch.get<IPlanItem[]>(api);
    sortBy(response, "title", "asc");
    plans.value = response;
  };

  const getPlanBy = (key: string, value: string) => {
    const parsedValue = key === "id" ? parseInt(value) : value;
    const result = plans.value.find((o: object) => o[key as keyof typeof o] === parsedValue);
    return result;
  };

  const createPlan = async (form: IPlanForm) => {
    await fetch.post<IPlanForm, IPlanItem>(api, form);
  };

  const editPlan = async (id: string, form: Partial<IPlanForm>) => {
    const parsedID = parseInt(id);
    await fetch.put<Partial<IPlanForm>, IPlanItem>(`${api}/${parsedID}`, form);
  };

  const deletePlan = async (id: string) => {
    const parsedID = parseInt(id);
    await fetch.remove(`${api}/${parsedID}`);
  };

  return { plans: readonly(plans), getPlans, getPlanBy, createPlan, editPlan, deletePlan };
});

// Export
export { useStorePlans };
