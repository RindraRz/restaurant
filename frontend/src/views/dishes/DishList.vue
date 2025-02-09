<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Dish } from '../../types'
import { dishApi } from '../../services/api'
import Loader from '../../components/Loader.vue'
import Header from '../Header.vue'

const router = useRouter()
const dishes = ref<Dish[]>([])
const loading = ref(false)

const fetchDishes = async () => {
  loading.value = true
  try {
    dishes.value = await dishApi.getAll()
  } finally {
    loading.value = false
  }
}

const deleteDish = async (id: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) return
  
  try {
    await dishApi.delete(id)
    await fetchDishes()
  } catch (error) {
    alert('Erreur lors de la suppression')
  }
}
const convertSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} minutes et ${remainingSeconds} secondes`;
};

console.log(convertSecondsToMinutes(125)); // "2 minutes et 5 secondes"


onMounted(fetchDishes)
</script>

<template>
  <div>
    <Header :title="'Plats'"/>
    <header class="page-header">
      <h2>Liste des plats</h2>
      <div class="header-actions">
        <button class="btn primary" @click="router.push('/dishes/new')">
          Ajouter un plat
        </button>
     
        <button class="btn primary" @click="router.push('/recipes/new')">
          Ajouter une recette à un plat
        </button>
      </div>
    </header>

    <div class="content">
      <Loader v-if="loading"/>
      
      <div v-else class="dishes-grid">
        <div v-for="dish in dishes" :key="dish.id" class="dish-card">
          <!-- <img :src="dish.image" :alt="dish.name" class="dish-image"> -->
          <div class="dish-info">
            <h3>{{ dish.name }}</h3>
            <p>Temps de cuisson: {{ convertSecondsToMinutes(dish.cookingTime) }} </p>
            <p>Prix: {{ dish.price }} Ar</p>
            <div class="actions">
              <button class="btn success" @click="router.push(`/plats/recettes/${dish.id}`)">

                Voir les recettes
              </button>
              <button class="btn" @click="router.push(`/dishes/${dish.id}/edit`)">
                Modifier
              </button>
              <button class="btn danger" @click="deleteDish(dish.id!)">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.dish-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.dish-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.dish-info {
  padding: 1rem;
}

.dish-info h3 {
  margin: 0 0 0.5rem 0;
}

.dish-info p {
  margin: 0.25rem 0;
  color: #666;
}
</style>