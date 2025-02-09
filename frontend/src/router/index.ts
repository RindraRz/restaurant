import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import IngredientList from '../views/ingredients/IngredientList.vue'
import IngredientForm from '../views/ingredients/IngredientForm.vue'
import DishList from '../views/dishes/DishList.vue'
import DishForm from '../views/dishes/DishForm.vue'
import RecipeList from '../views/recipes/RecipeList.vue'
import RecipeForm from '../views/recipes/RecipeForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    // Ingredients routes
    {
      path: '/ingredients',
      name: 'IngredientList',
      component: IngredientList,
      meta: { requiresAuth: true }
    },
    {
      path: '/ingredients/:id/edit',
      name: 'IngredientEdit',
      component: IngredientForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/ingredients/new',
      name: 'IngredientCreate',
      component: IngredientForm,
      meta: { requiresAuth: true }
    },
    // Dishes routes
    {
      path: '/dishes',
      name: 'DishList',
      component: DishList,
      meta: { requiresAuth: true }
    },
    {
      path: '/dishes/:id/edit',
      name: 'DishEdit',
      component: DishForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/dishes/new',
      name: 'DishCreate',
      component: DishForm,
      meta: { requiresAuth: true }
    },
    // Recipes routes
    {
      path: '/recipes',
      name: 'RecipeList',
      component: RecipeList,
      meta: { requiresAuth: true }
    },
    {
      path: '/recipes/:id/edit',
      name: 'RecipeEdit',
      component: RecipeForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/recipes/new',
      name: 'RecipeCreate',
      component: RecipeForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/plats/recettes/:id', 
      component: RecipeList,
      meta: { requiresAuth: true },
      props: true
    },
  ]
})

export default router