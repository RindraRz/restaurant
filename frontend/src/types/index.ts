export interface Ingredient {
    id?: number;
    name: string;
    unit: string;
  }
  
  export interface Dish {
    id?: number;
    name: string;
    cookingTime: number;
    price: number;
  }
  
  export interface Recipe {
    id?: number;
    dishId: number;
    dish?: Dish;
    ingredients: RecipeIngredient[];
  }
  
  export interface RecipeIngredient {
    ingredientId: number;
    ingredient?: Ingredient;
    quantity: number;
  }
  export interface Ingredient {
    id?: number;
    name: string;
    unit: string;
  }
  
  export interface Dish {
    id?: number;
    name: string;
    cookingTime: number;
    price: number;
    image: string;
  }
  
  export interface Recipe {
    id?: number;
    dishId: number;
    dish?: Dish;
    ingredients: RecipeIngredient[];
  }
  
  export interface RecipeIngredient {
    
    ingredientId: number;
    ingredient?: Ingredient;
    quantity: number;
  }