import axios from "axios";
import { mockCategories } from "./mockData";
import { mockMealsByCategory } from "./mockMeals";
import { mockRecipeDetails } from "./mockRecipeDetails";

const BASE = "https://www.themealdb.com/api/json/v1/1/";

// Helper function to handle API calls with fallback and timeout
const apiCallWithFallback = async (apiCall, fallbackData, timeout = 3000) => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('API timeout')), timeout);
    });
    
    const response = await Promise.race([apiCall, timeoutPromise]);
    return response;
  } catch (error) {
    console.warn('API call failed or timed out, using fallback data:', error.message);
    return { data: fallbackData };
  }
};

export const fetchCategories = () => 
  apiCallWithFallback(
    axios.get(`${BASE}/categories.php`), 
    { categories: mockCategories }
  );

export const fetchMealsByCategory = (cat) => 
  apiCallWithFallback(
    axios.get(`${BASE}/filter.php?c=${cat}`), 
    { meals: mockMealsByCategory[cat] || [] }
  ); 

export const fetchMealById = (id) => 
  apiCallWithFallback(
    axios.get(`${BASE}/lookup.php?i=${id}`),
    { meals: [mockRecipeDetails[id]] || [] }
  );

export const searchMeals = (query) => 
  apiCallWithFallback(
    axios.get(`${BASE}/search.php?s=${query}`),
    { meals: [] }
  );