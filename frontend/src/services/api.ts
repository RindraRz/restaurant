import axios from 'axios';
import type { Ingredient, Dish, Recipe } from '../types'

// Simulated API calls with Promise delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const URL_API = "http://127.0.0.1:8000/api/"
const getAuthToken = () => localStorage.getItem("authToken");
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getAuthToken()}` 
};
 
// Ingredients API
export const ingredientApi = {
  async getAll(): Promise<Ingredient[]> {
    await delay(500)

    try {
      const response = await fetch(URL_API + "ingredients", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      return data.map((item: any) => ({
        id: item.id,
        name: item.nom,
        unit: item.unite,
      }))
    } catch (error) {
      console.error("Erreur lors de la récupération des ingrédients:", error)
      return []
    }
  },

  async getById(id: number): Promise<Ingredient> {
    await delay(300)
    return { id, name: '', unit: '' }
  },

  async create(ingredient: Omit<Ingredient, 'id'>): Promise<Ingredient> {
    await delay(500)
    const ingredientData = {
      nom: ingredient.name, 
      unite: ingredient.unit 
    };
    try {
 
      const response = await axios.post(URL_API+'ingredients', ingredientData,{headers});
  
     
      return { ...ingredient, id: response.data.id }; 
    } catch (error) {
      console.error('Erreur lors de la création de l\'ingrédient:', error);
      throw error;
    }
   
  },

  async update(id: number, ingredient: Omit<Ingredient, 'id'>): Promise<Ingredient> {
    await delay(500)
    return { ...ingredient, id }
  },

  async delete(id: number): Promise<void> {
    await delay(500)
    try {
      console.log(id)
      const response = await axios.delete(URL_API+'ingredients/'+id,{headers});
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ingrédient:', error);
      throw error;
    }
  }
}

// Dishes API
export const dishApi = {
  async getAll(): Promise<Dish[]> {
    await delay(500)
    try {
      const response = await fetch(URL_API + "plats", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
    

      return data.map((item: any) => ({
        id: item.id,
        name: item.nom,
        cookingTime: item.cusineTime,
        price : item.prix
      }))
    } catch (error) {
      console.error("Erreur lors de la récupération des plats:", error)
      return []
    }
  },

  async getById(id: number): Promise<Dish> {
    await delay(300)
    return { id, name: '', cookingTime: 0, price: 0, image: '' }
  },

  async create(dish: Omit<Dish, 'id'>): Promise<Dish> {
    await delay(500)
    const platData = {
      nom: dish.name, 
      cusineTime: dish.cookingTime*60,
      prix : dish.price 
    };
    try {
      const response = await axios.post(URL_API+'plats', platData,{headers});
      return { ...dish, id: response.data.id }; 
    } catch (error) {
      console.error('Erreur lors de la création de l\'ingrédient:', error);
      throw error;
    }
  },

  async update(id: number, dish: Omit<Dish, 'id'>): Promise<Dish> {
    await delay(500)
    return { ...dish, id }
  },

  async delete(id: number): Promise<void> {
    await delay(500)
    try {
      console.log(id)
      const response = await axios.delete(URL_API+'plats/'+id,{headers});
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ingrédient:', error);
      throw error;
    }
  }
}

// Recipes API
export const recipeApi = {
  async getAll(idPlat: number): Promise<Recipe[]> {
    await delay(500);
  
    try {
      const response = await fetch(URL_API + "recettes/plat/" + idPlat, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAuthToken()}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Données reçues :", data);
  
      // Groupement des recettes par plat
      const recipeMap = new Map<number, Recipe>();
  
      data.forEach((recipe: any) => {
        const dishId = recipe.plat.id;
        const ingredient = {
          ingredientId: recipe.ingredient.id,
          ingredient: {
            id: recipe.ingredient.id,
            name: recipe.ingredient.nom,
            unit: recipe.ingredient.unit ?? "" 
          },
          quantity: recipe.quantite
        };
  
        if (!recipeMap.has(dishId)) {
      
          recipeMap.set(dishId, {
            id: recipe.id,
            dishId: dishId,
            dish: {
              id: dishId,
              name: recipe.plat.nom,
              cookingTime: recipe.plat.cookingTime ?? 0,  
              price: recipe.plat.price ?? 0,  
              image: recipe.plat.image ?? ""  
            },
            ingredients: [ingredient]
          });
        } else {
          // Ajouter l'ingrédient à la recette existante
          recipeMap.get(dishId)!.ingredients.push(ingredient);
        }
      });
  
      // Convertir la Map en tableau
      return Array.from(recipeMap.values());
  
    } catch (error) {
      console.error("Erreur lors de la récupération des plats:", error);
      return [];
    }
  },
  
  
  async getById(id: number): Promise<Recipe> {
    await delay(300)
    return { id, dishId: 0, ingredients: [] }
  },

  async create(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    // Attendre 500ms pour simuler un délai (optionnel)
    await delay(500);
  
    // Créer un tableau pour stocker les réponses des requêtes API
    const ingredientPromises = recipe.ingredients.map(async (ingredient) => {
      // Préparer les données de l'ingrédient
      const ingredientData = {
        platId: recipe.dishId,  
        ingredientId: ingredient.ingredientId,  
        quantite: ingredient.quantity,  
      };

  
      try {
   
        const response = await fetch(URL_API+"recettes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthToken()}`, 
          },
          body: JSON.stringify(ingredientData), 
        });
  
        if (!response.ok) {
          const errorResponse = await response.json();  // Lire la réponse complète
          console.error('Erreur API pour l\'ingrédient:', errorResponse);
          throw new Error(`Erreur API pour l'ingrédient ${ingredient.ingredientId}: ${response.status} ${response.statusText}`);
        }
  
        // Retourner la réponse pour l'ingrédient
        return await response.json();
      } catch (error) {
        console.error(`Erreur lors de l'envoi de l'ingrédient ${ingredient.ingredientId}:`, error);
        throw error;
      }
    });
  
    // Attendre que toutes les requêtes pour les ingrédients soient terminées
    const ingredientsResponse = await Promise.all(ingredientPromises);
  
    // Créer la recette finale avec les réponses des ingrédients
    return {
      id: Date.now(), // Utiliser un ID généré pour la recette
      dishId: recipe.dishId,
      ingredients: ingredientsResponse.map((res: any) => ({
        ingredientId: res.ingredientId, // ID de l'ingrédient
        quantity: res.quantite, // Quantité
      })),
    };
  },
  

  async update(id: number, recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    await delay(500)
    return { ...recipe, id }
  },

  async delete(id: number): Promise<void> {
    await delay(500)
    try {
      console.log(id)
      const response = await axios.delete(URL_API+'recettes/'+id,{headers});
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'ingrédient:', error);
      throw error;
    }
  }
}