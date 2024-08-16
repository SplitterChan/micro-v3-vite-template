<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function toTestPage() {
  router.push('/test/page');
}
</script>
<template>
  <div>
    <a-button @click="toTestPage" type="primary">测试按钮</a-button>
  </div>
</template>
<style scoped></style>
<route>
{
  meta: {
    layout: "LoginLayout"
  }
}
</route>
