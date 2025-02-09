<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const menuItems = [
  { name: 'Dashboard', icon: '📊', route: '/' },
  { name: 'Ingrédients', icon: '👩‍🍳', route: '/ingredients' },
  { name: 'Plats', icon: '🍽️', route: '/dishes' },
  { name: 'Recettes', icon: '📝', route: '/recipes' },
]

const navigate = (route: string) => {
  router.push(route)
}
</script>

<template>
  <nav class="sidenav">
    <div class="logo-container">
      <h2>Restaurant Admin</h2>
    </div>
    <ul class="nav-links">
      <li v-for="item in menuItems" :key="item.name">
        <a @click.prevent="navigate(item.route)" 
           :class="['nav-link', { active: $route.path === item.route }]">
          <span class="icon">{{ item.icon }}</span>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style>
@import '../assets/styles/components/sidenav.css';

.nav-link.active {
  background-color: var(--sidebar-hover);
}
</style>