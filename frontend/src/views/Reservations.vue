<script setup lang="ts">
import { ref } from 'vue';
import Loader from '../components/Loader.vue';


const loading = ref(true); 


setTimeout(() => {
  loading.value = false;
}, 2000); 
</script>

<template>
  <Loader v-if="loading" />
  <div v-else>
    <header class="page-header">
      <h1>Réservations</h1>
    </header>
    <div class="content">
      <p>Page des réservations en construction...</p>
    </div>
  </div>
</template>