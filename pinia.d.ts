// types/pinia.d.ts 或 pinia.d.ts
import 'pinia'
import { NuxtPiniaPersistedstateOptions } from '@pinia-plugin-persistedstate/nuxt' // 可选：如果你需要更具体的类型

declare module 'pinia' {
  // 扩展 DefineStoreOptionsBase
  export interface DefineStoreOptionsBase<S, Store> {
    persist?:
      | boolean
      | {
          key?: string
          storage?: 'localStorage' | 'sessionStorage' | Storage
          paths?: string[]
          beforeRestore?: (context: PiniaPluginContext) => void
          afterRestore?: (context: PiniaPluginContext) => void
          // 其他您插件支持的选项...
        }
  }
}