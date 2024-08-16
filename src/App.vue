<script setup lang="ts">
import useCurrentInstance from '@/hooks/useCurrentInstance';
import { CacheType } from '@utils/cache';

const { proxy } = useCurrentInstance();
proxy.$cache.set('alibi', '214214', CacheType.Session);
console.log(proxy.$cache.get('alibi', CacheType.Session));
</script>

<template>
  <div class="layout">
    <router-view />
  </div>
</template>

<style lang="scss" scoped></style>
