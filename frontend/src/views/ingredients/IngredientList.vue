<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Ingredient } from '../../types'
import { ingredientApi } from '../../services/api'
import Loader from '../../components/Loader.vue'
import Header from '../Header.vue'

const router = useRouter()
const ingredients = ref<Ingredient[]>([])
const loading = ref(false)

const fetchIngredients = async () => {
  loading.value = true
  try {
    ingredients.value = await ingredientApi.getAll()
  } finally {
    loading.value = false
  }
}

const deleteIngredient = async (id: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet ingrédient ?')) return
  
  try {
    await ingredientApi.delete(id)
    await fetchIngredients()
  } catch (error) {
    alert('Erreur lors de la suppression')
  }
}

onMounted(fetchIngredients)

</script>

<template>
  <div>
    <Header :title="'Ingredients'"/>
    <header class="page-header">
      <h3>Liste des ingredients</h3>
      <div class="header-actions">
        <button class="btn primary" @click="router.push('/ingredients/new')">
          Ajouter un ingrédient
        </button>
      </div>
    </header>

    <div class="content">
      <Loader v-if="loading"/>
      
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Unité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingredient in ingredients" :key="ingredient.id">
            <td>{{ ingredient.name }}</td>
            <td>{{ ingredient.unit }}</td>
            <td class="actions">
              <button class="btn" @click="router.push(`/ingredients/${ingredient.id}/edit`)">
                Modifier
              </button>
              <button class="btn danger" @click="deleteIngredient(ingredient.id!)">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background: #f8f8f8;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn.primary {
  background: var(--primary-color);
  color: white;
}

.btn.danger {
  background: #dc2626;
  color: white;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>