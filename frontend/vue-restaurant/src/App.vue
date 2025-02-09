<script setup lang="ts">
import SideNav from './components/SideNav.vue'
import DashboardStats from './components/DashboardStats.vue'
</script>

<template>
  <div class="app-container">
    <SideNav />
    <main class="main-content">
      <header class="page-header">
        <h1>Dashboard</h1>
        <div class="header-actions">
          <button class="btn">Notifications</button>
          <button class="btn">Profile</button>
        </div>
      </header>
      <DashboardStats />
    </main>
  </div>
</template>

<style>
:root {
  --primary-color: #10B981;
  --background-color: #f5f5f5;
  --text-color: #333;
}

body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
}

.app-container {
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  background-color: white;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background-color: #f5f5f5;
  border-color: #ccc;
}

h1 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--text-color);
}
</style>
