<script setup>
import { storeToRefs } from 'pinia';
import { useThemeStore } from '../stores/themeStore.js';
import { watch } from "vue";

const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);
const toggleTheme = () => {
  const theme = currentTheme.value === 'light' ? 'dark' : 'light';
  themeStore.setTheme(theme);
};
watch(currentTheme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
</script>
<template>
  <div class="theme-switcher">
    <button @click="toggleTheme" class="theme-toggle">
      {{ currentTheme === 'light' ? '🌙' : '☀️' }}
    </button>
  </div>
</template>
<style>
h1 {
  color: var(--primary-color);
  margin-bottom: 20px;
}
</style>
