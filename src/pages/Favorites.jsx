import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavContext } from '../components/FavContext';

const Favorites = () => {
  const { favorites } = useContext(FavContext);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Link 
        to="/" 
        className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6"
      >
        ← Back to Categories
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Favorite Recipes
        </h1>
        <p className="text-gray-600">
          {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No favorite recipes yet
          </h2>
          <p className="text-gray-500 mb-6">
            Start exploring and add your favorite recipes to see them here!
          </p>
          <Link 
            to="/"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((meal) => (
            <Link 
              key={meal.idMeal} 
              to={`/recipe/${meal.idMeal}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={meal.strMealThumb} 
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full">
                    ❤️
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                    {meal.strMeal}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {meal.strCategory}
                    </span>
                    <p className="text-emerald-600 text-sm font-medium">
                      View Recipe →
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;