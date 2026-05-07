import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('my_fav_recipes', []);

  const toggleFavorite = (recipe) => {
    console.log('Toggle favorite called with recipe:', recipe);
    console.log('Recipe idMeal:', recipe.idMeal);
    
    setFavorites((prev) => {
      console.log('Current favorites:', prev);
      const isAlreadyFav = prev.find((item) => item.idMeal === recipe.idMeal);
      console.log('Is already favorite:', isAlreadyFav);
      
      if (isAlreadyFav) {
        const newFavorites = prev.filter((item) => item.idMeal !== recipe.idMeal);
        console.log('Removed from favorites. New favorites:', newFavorites);
        return newFavorites; // Remove
      }
      const newFavorites = [...prev, recipe];
      console.log('Added to favorites. New favorites:', newFavorites);
      return newFavorites; // Add
    });
  };

  const isFavorite = (id) => favorites.some((item) => item.idMeal === id);

  return (
    <FavContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavContext.Provider>
  );
};
