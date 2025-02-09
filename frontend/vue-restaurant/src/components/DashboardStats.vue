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

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.stat-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.stat-info h3 {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.stat-trend {
  color: #10B981;
  font-size: 0.9rem;
}
</style>
