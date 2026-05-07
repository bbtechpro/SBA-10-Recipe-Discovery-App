import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('my_fav_recipes', []);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const isAlreadyFav = prev.find((item) => item.idMeal === recipe.idMeal);
      if (isAlreadyFav) {
        return prev.filter((item) => item.idMeal !== recipe.idMeal); // Remove
      }
      return [...prev, recipe]; // Add
    });
  };

  const isFavorite = (id) => favorites.some((item) => item.idMeal === id);

  return (
    <FavContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavContext.Provider>
  );
};
