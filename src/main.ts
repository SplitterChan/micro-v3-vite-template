import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'uno.css';
import { createPinia } from 'pinia';
import Cache from './utils/cache';
import WujieVue from 'wujie-vue3';
import { mainAppInitial } from '@/micro/initial';
import { createRouter, createWebHashHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import RouteGuard from './utils/route_guard';

const { bus } = WujieVue;

export const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(generatedRoutes)
});

router.beforeEach((to, from, next) => {
  RouteGuard(to, from, next);
  to.meta.title && (document.title = to.meta.title as string);
  next();
});

const pinia = createPinia();

createApp(App).use(router).use(WujieVue).use(pinia).use(Cache).mount('#app');

mainAppInitial({ bus });
