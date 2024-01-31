import { defineStore } from "pinia";
import { Role } from "../types/roles";

export const useUserStore = defineStore("user", {
  state: () => ({
    authenticated: false,
    role: Role.DEFAULT,
  }),

  actions: {
    async login(username: string, password: string) {
      const userData = await apiLogin(username, password);

      this.$patch({
        ...userData,
      })
    },

    async logout() {
      this.$patch({
        authenticated: false,
      });
    }
  },
});

/**
 * 
 * Simulate user login 
 */
function apiLogin(username: string, password: string) {
  if (username === "a" && password === "a") return Promise.resolve({ authenticated: true, role: Role.ADMIN });
  if (username === "a") return Promise.resolve({ authenticated: true, role: Role.MANAGER });
  
  return Promise.resolve({ authenticated: true, role: Role.DEFAULT })
  // return Promise.reject(new Error("Username or Password are incorret"));
}