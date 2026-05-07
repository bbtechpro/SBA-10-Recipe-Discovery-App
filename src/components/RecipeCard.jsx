import { useContext } from 'react';
import { FavContext } from './FavContext';

const RecipeCard = ({ recipe }) => {
  const { toggleFavorite, isFavorite } = useContext(FavContext);
  const faved = isFavorite(recipe.idMeal);

  return (
    <div className="card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <button onClick={() => toggleFavorite(recipe)}>
        {faved ? '❤️ Remove' : '🤍 Add to Favorites'}
      </button>
    </div>
  );
};

export default RecipeCard;
