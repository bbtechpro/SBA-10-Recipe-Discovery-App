import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { FavContext } from '../components/FavContext';
import { fetchMealById } from '../api/mealdb';
import Spinner from '../components/Spinner';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useContext(FavContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetchMealById(id);
        if (response.data.meals) {
          setRecipe(response.data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to fetch recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!recipe) return <div className="text-center py-10">Recipe not found</div>;

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure || ''} ${ingredient}`.trim());
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link 
        to="/" 
        className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6"
      >
        ← Back to Categories
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{recipe.strMeal}</h1>
            <button
              onClick={() => toggleFavorite(recipe)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isFavorite(recipe.idMeal)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isFavorite(recipe.idMeal) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Category & Area</h2>
            <div className="flex gap-4">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                {recipe.strCategory}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {recipe.strArea}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Ingredients</h2>
            <ul className="grid grid-cols-2 gap-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-emerald-600 mr-2">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Instructions</h2>
            <div className="prose max-w-none">
              {recipe.strInstructions.split('\r\n').map((instruction, index) => (
                instruction.trim() && (
                  <p key={index} className="mb-2 text-gray-600">
                    {instruction.trim()}
                  </p>
                )
              ))}
            </div>
          </div>

          {recipe.strYoutube && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-700">Video Tutorial</h2>
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-800 underline"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;