import { defineStore } from 'pinia';
import { reactive } from 'vue';

// 全局共享store
export const useGlobalStore = defineStore('global', () => {
  const globalState = reactive({
    main: {
      count: 0
    }
  });

  function setGlobalState(subApp, metaData) {
    globalState[subApp] = { ...(globalState[subApp] ?? {}), ...metaData };
  }

  return {
    globalState,
    setGlobalState
  };
});
