<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SideNav from './components/SideNav.vue'

const route = useRoute()
const showSideNav = computed(() => route.name !== 'Login')
</script>

<template>
  <div style="width: 100%">
    <SideNav v-if="showSideNav" />
    <main :class="{ 'main-content': showSideNav }">
      <router-view></router-view>
    </main>
  </div>
</template>
<style>
  .app-container {
    width: 100%;
  }
</style>
