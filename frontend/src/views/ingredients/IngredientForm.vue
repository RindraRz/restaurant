<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Ingredient } from '../../types'
import { ingredientApi } from '../../services/api'

const router = useRouter()
const route = useRoute()
const ingredient = ref<Ingredient>({ name: '', unit: '' })
const loading = ref(false)
const saving = ref(false)

const isEdit = computed(() => route.params.id !== 'new' && route.params.id !== undefined)


onMounted(async () => {
  if (isEdit.value) {
    loading.value = true
    try {
      ingredient.value = await ingredientApi.getById(Number(route.params.id))
    } finally {
      loading.value = false
    }
  }
})

const saveIngredient = async () => {
  saving.value = true
  try {
    if (isEdit.value) {
      await ingredientApi.update(Number(route.params.id), ingredient.value)
    } else {
      await ingredientApi.create(ingredient.value)
    }
    router.push('/ingredients')
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
      <h1>{{ isEdit ? 'Modifier' : 'Ajouter' }} un ingrédient</h1>
    </header>

    <div class="content">
      <div v-if="loading" class="loading">Chargement...</div>
      
      <form v-else @submit.prevent="saveIngredient" class="form">
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            id="name"
            v-model="ingredient.name"
            type="text"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="unit">Unité</label>
          <input
            id="unit"
            v-model="ingredient.unit"
            type="text"
            required
            class="form-control"
          />
        </div>

        <div class="form-actions">
          <button type="button" class="btn" @click="router.push('/ingredients')">
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
.form {
  max-width: 600px;
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}
</style>