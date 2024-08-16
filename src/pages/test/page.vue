<script setup lang="ts">
import { useGlobalStore } from '@/stores/global';
import { toRefs, computed } from 'vue';

const { globalState } = useGlobalStore();

const state = toRefs(globalState);

const count = computed(() => state['main'].value.count);
</script>

<template>
  <div>
    <span display="block" class="to-blue-400" color="gray-200">testPage</span>
    <button class="text-orange-400 p-20">
      {{ count }}
    </button>
    <MicroAppContext name="sub-app" url="http://localhost:8080/#/test" />
  </div>
</template>

<route>
{
  name: "test",
  meta: {
    title: "测试"
  }
}
</route>
