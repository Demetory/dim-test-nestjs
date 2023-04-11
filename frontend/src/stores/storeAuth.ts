// Core
import { ref, readonly } from "vue";
import { defineStore } from "pinia";
// Interfaces
import type { IUserAuth } from "src/types/IUserAuth";

// Store
const useStoreAuth = defineStore("storeAuth", () => {
  // State
  const users = [
    {
      name_first: "Angry",
      name_last: "Admin",
      role: "admin",
      login: "admin",
      password: "admin",
    },
    {
      name_first: "Poor",
      name_last: "User",
      role: "user",
      login: "user",
      password: "user",
    },
  ];

  const user = ref<IUserAuth>({
    name_first: "Demetrey",
    name_last: "Iljin",
    role: "admin",
  });

  // Methods
  const doAuth = async (data: { login: string; password: string }) => {
    const result = await users.find((obj) => obj.login === data.login);
    if (result && result.password === data.password) {
      user.value = result;
      return true;
    } else {
      return false;
    }
  };

  const doLogout = async () => {
    user.value = {
      name_first: "",
      name_last: "",
      role: "",
    };
    return true;
  };

  return { users: readonly(users), user: readonly(user), doAuth, doLogout };
});

// Export
export { useStoreAuth };
