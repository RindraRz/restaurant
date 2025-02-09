<script setup lang="ts">
const menuItems = [
  { name: 'Dashboard', icon: '📊', route: '/' },
  { name: 'Commandes', icon: '📝', route: '/orders' },
  { name: 'Menu', icon: '🍽️', route: '/menu' },
  { name: 'Réservations', icon: '📅', route: '/reservations' },
  { name: 'Personnel', icon: '👥', route: '/staff' },
  { name: 'Inventaire', icon: '📦', route: '/inventory' },
]
</script>

<template>
  <nav class="sidenav">
    <div class="logo-container">
      <h2>Restaurant Admin</h2>
    </div>
    <ul class="nav-links">
      <li v-for="item in menuItems" :key="item.name">
        <a :href="item.route" class="nav-link">
          <span class="icon">{{ item.icon }}</span>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidenav {
  width: 250px;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
  padding: 1rem;
  position: fixed;
  left: 0;
  top: 0;
}

.logo-container {
  padding: 1rem 0;
  text-align: center;
  border-bottom: 1px solid #333;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin-top: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.nav-link:hover {
  background-color: #333;
}

.icon {
  margin-right: 0.75rem;
  font-size: 1.2rem;
}
</style>
