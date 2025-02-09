<script setup lang="ts">
import { ref } from 'vue';

import { useRouter } from 'vue-router'; // Importez useRouter pour la redirection

const router = useRouter();


const loading = ref(true); 


setTimeout(() => {
  loading.value = false;
}, 2000); 


const logout = () => {
  localStorage.removeItem('authToken'); 
  router.push('/login'); 
};
defineProps<{
  title: string;

}>();
</script>

<template>
  <div>
    <header class="page-header">
      <h1>{{title}}</h1>
      <div class="header-actions">
        <button class="btn btn-logout" @click="logout">Déconnexion</button>
      </div>
    </header>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-header h1 {
  font-size: 1.5rem;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f0f0f0;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #e0e0e0;
}

.btn-logout {
  background-color: #ff4d4d; 
  color: white;
}

.btn-logout:hover {
  background-color: #e60000; 
}
</style>