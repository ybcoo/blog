// stores/theme.ts
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  // 状态
  state: () => ({
    active:"home",
    theme:{ label: "light", color: "#f6f1ed" }
  }),
   persist: true,
  
  // 计算属性（类似 Vuex 的 getters）
  getters: {
    hovorColor: (state) => {
      return state.theme.label === "light" ? "#e5e0d6" : "#1b2212";
    }
  },
  
  // 方法（类似 Vuex 的 actions）
  actions: {
    
  }
})
