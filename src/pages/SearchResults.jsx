import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchMeals } from '../api/mealdb';
import Spinner from '../components/Spinner';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchRecipes = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await searchMeals(query);
        if (response.data.meals) {
          setResults(response.data.meals);
        } else {
          setResults([]);
        }
      } catch (err) {
        setError('Failed to search recipes');
      } finally {
        setLoading(false);
      }
    };

    searchRecipes();
  }, [query]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

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
          Search Results
        </h1>
        <p className="text-gray-600">
          {query ? `Searching for "${query}"` : 'No search query provided'}
        </p>
      </div>

      {!query ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Please enter a search term in the navigation bar.</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No recipes found for "{query}".</p>
          <p className="text-gray-400 mt-2">Try searching with different keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((meal) => (
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
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                    {meal.strMeal}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {meal.strArea}
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

export default SearchResults;