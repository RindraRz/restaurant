<script setup lang="ts">
import { ref } from 'vue'

const stats = ref([
  { title: 'Commandes du jour', value: '24', trend: '+12%', icon: '📈' },
  { title: 'Revenu journalier', value: '1,250 €', trend: '+8%', icon: '💶' },
  { title: 'Réservations', value: '18', trend: '+5%', icon: '📅' },
  { title: 'Clients actifs', value: '45', trend: '+15%', icon: '👥' },
])
</script>

<template>
  <div class="stats-grid">
    <div v-for="stat in stats" :key="stat.title" class="stat-card">
      <div class="stat-icon">{{ stat.icon }}</div>
      <div class="stat-info">
        <h3>{{ stat.title }}</h3>
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-trend">{{ stat.trend }}</div>
      </div>
    </div>
  </div>
</template>

<style>
@import '../assets/styles/components/dashboard.css';
</style>