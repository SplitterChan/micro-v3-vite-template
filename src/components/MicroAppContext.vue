<script setup lang="ts">
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';

interface IProps {
  name?: string;
  url?: string;
}
const { globalState } = storeToRefs(useGlobalStore());

const { name, url } = withDefaults(defineProps<IProps>(), {
  name: '',
  url: ''
});
</script>

<template>
  <WujieVue :name="name" :url="url" :props="globalState" />
</template>

<style lang="scss" scoped></style>
