<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Recipe, Dish, Ingredient, RecipeIngredient } from '../../types'
import { recipeApi, dishApi, ingredientApi } from '../../services/api'

const router = useRouter()
const route = useRoute()
const recipe = ref<Recipe>({ dishId: 0, ingredients: [] })
const dishes = ref<Dish[]>([])
const ingredients = ref<Ingredient[]>([])
const loading = ref(false)
const saving = ref(false)

const isEdit = computed(() => route.params.id !== 'new' && route.params.id !== undefined)

const idPlat = ref(0);

onMounted(async () => {
  loading.value = true
  try {
    [dishes.value, ingredients.value] = await Promise.all([
      dishApi.getAll(),
      ingredientApi.getAll()
    ])
    
    if (isEdit.value) {
      recipe.value = await recipeApi.getById(Number(route.params.id))
    }
  } finally {
    loading.value = false
  }
})

const addIngredient = () => {
  recipe.value.ingredients.push({
    ingredientId: 0,
    quantity: 0
  })
}

const removeIngredient = (index: number) => {
  recipe.value.ingredients.splice(index, 1)
}

const saveRecipe = async () => {
  saving.value = true
  try {
    if (isEdit.value) {
      await recipeApi.update(Number(route.params.id), recipe.value)
    } else {
      await recipeApi.create(recipe.value)
    }
    router.push(`/plats/recettes/${recipe.value.dishId}`)
  } catch (error) {
    alert('Erreur lors de la sauvegarde')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <header class="page-header">
      <h1>{{ isEdit ? 'Modifier' : 'Ajouter' }} une recette</h1>
    </header>

    <div class="content">
      <div v-if="loading" class="loading">Chargement...</div>
      
      <form v-else @submit.prevent="saveRecipe" class="form">
        <div class="form-group">
          <label for="dish">Plat</label>
          <select
            id="dish"
            v-model="recipe.dishId"
          
            required
            class="form-control"
          >
            <option value="">Sélectionnez un plat</option>
            <option v-for="dish in dishes" :key="dish.id" :value="dish.id">
              {{ dish.name }}
            </option>
          </select>
        </div>

        <div class="ingredients-section">
          <div class="section-header">
            <h3>Ingrédients</h3>
            <button type="button" class="btn" @click="addIngredient">
              Ajouter un ingrédient
            </button>
          </div>

          <div v-for="(item, index) in recipe.ingredients" :key="index" class="ingredient-row">
            <div class="form-group">
              <label>Ingrédient</label>
              <select
                v-model="item.ingredientId"
                required
                class="form-control"
              >
                <option value="">Sélectionnez un ingrédient</option>
                <option v-for="ing in ingredients" :key="ing.id" :value="ing.id">
                  {{ ing.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Quantité</label>
              <input
                v-model.number="item.quantity"
                type="number"
                required
                min="0"
                step="0.01"
                class="form-control"
              />
            </div>

            <button type="button" class="btn danger" @click="removeIngredient(index)">
              Supprimer
            </button>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn" @click="router.push('/recipes')">
            Annuler
          </button>
          <button type="submit" class="btn primary" :disabled="saving">
            {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.ingredients-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: var(--border-radius);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.ingredient-row {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}
</style>