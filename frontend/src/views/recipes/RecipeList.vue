<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute} from 'vue-router'
import type { Recipe } from '../../types'
import { recipeApi } from '../../services/api'
import Header from '../Header.vue'
import Loader from '../../components/Loader.vue'

const recipes = ref<Recipe[]>([])
const loading = ref(false)
const route = useRoute()
const idPlat = computed(() => route.params.id)


const fetchRecipes = async () => {
  loading.value = true
  try {
    recipes.value = await recipeApi.getAll(Number(idPlat.value))
  } finally {
    loading.value = false
  }
}

const deleteRecipe = async (id: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) return
  try {
    await recipeApi.delete(id)
    await fetchRecipes()
  } catch (error) {
    alert('Erreur lors de la suppression')
  }
}

onMounted(fetchRecipes)
</script>

<template>
  <div>
  <Header title="Plats"/>
    <header class="page-header">
      <h2>Recettes </h2>
    </header>

    <div class="content">
      <Loader v-if="loading"/>
      
      <div v-else class="recipes-list">
        <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
  <div class="recipe-info">
    <h3>{{ recipe.dish?.name }}</h3>
    <div class="ingredients-list">
      <h4>Ingrédients :</h4>
      <ul v-if="recipe.ingredients.length > 0">
        <li v-for="item in recipe.ingredients" :key="item.ingredientId" class="ingredient-item">
          
           {{ item.ingredient?.name }} 
           <span class="icon">{{ '➡' }}</span>
           {{ item.quantity }} {{ item.ingredient?.unit }}
           <button class="btn danger" @click="deleteRecipe(recipe.id!)">
              Supprimer
            </button>
        </li>
      </ul>
      <p v-else>Aucun ingrédient pour cette recette.</p>
    </div>

    <div class="actions">
      <!-- <button class="btn edit" @click="router.push(`/recipes/${recipe.id}/edit`)">
        Modifier
      </button> -->
      
    </div>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<style>
.recipes-list {
  display: grid;
  gap: 1.5rem;
}

.recipe-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;

}

.recipe-info h3 {
  margin: 0 0 1rem 0;
}

.ingredients-list {
  margin: 1rem 0;
}

.ingredient-item {
  padding: 0.5rem;
  background: #f8f8f8;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}
.recipe-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.recipe-info h3 {
  margin-bottom: 10px;
  color: #333;
}

.ingredients-list h4 {
  margin-bottom: 5px;
}

.ingredients-list ul {
  list-style-type: none;
  padding: 0;
}

.ingredient-item {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.actions {
  margin-top: 10px;
}

.btn {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.btn.edit {
  background: #007bff;
  color: white;
}

.btn.danger {
  background: #dc3545;
  color: white;
  margin-left: 10px;
}

</style>