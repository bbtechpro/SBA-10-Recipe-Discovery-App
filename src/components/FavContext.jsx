import { createContext, useState, useEffect } from 'react';

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  // Initialize state with data from localStorage if it exists
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('my_fav_recipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep localStorage in sync whenever favorites change
  useEffect(() => {
    localStorage.setItem('my_fav_recipes', JSON.stringify(favorites));
  }, [favorites]);

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
