<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Dish } from '../../types'
import { dishApi } from '../../services/api'
import Header from '../Header.vue'

const router = useRouter()
const route = useRoute()
const dish = ref<Dish>({ name: '', cookingTime: 0, price: 0, image: '' })
const loading = ref(false)
const saving = ref(false)

const isEdit = computed(() => route.params.id !== 'new' && route.params.id !== undefined)


onMounted(async () => {
  if (isEdit.value) {
    loading.value = true
    try {
      dish.value = await dishApi.getById(Number(route.params.id))
    } finally {
      loading.value = false
    }
  }
})

const saveDish = async () => {
  saving.value = true
  try {
    if (isEdit.value) {
      await dishApi.update(Number(route.params.id), dish.value)
    } else {
      await dishApi.create(dish.value)
    }
    router.push('/dishes')
  } catch (error) {
    alert('Erreur lors de la sauvegarde')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <Header :title="'Plats'"/>
    <header class="page-header">
      <h2>{{ isEdit ? 'Modifier' : 'Ajouter' }} un plat</h2>
    </header>

    <div class="content">
      <Loader v-if="loading"/>
      
      <form v-else @submit.prevent="saveDish" class="form">
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            id="name"
            v-model="dish.name"
            type="text"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="cookingTime">Temps de cuisson (minutes)</label>
          <input
            id="cookingTime"
            v-model.number="dish.cookingTime"
            type="number"
            required
            min="0"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="price">Prix (Ar)</label>
          <input
            id="price"
            v-model.number="dish.price"
            type="number"
            required
            min="0"
            step="0.01"
            class="form-control"
          />
        </div>

      

        <div class="form-actions">
          <button type="button" class="btn" @click="router.push('/dishes')">
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