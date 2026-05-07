import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMealsByCategory } from '../api/mealdb';
import { mockMealsByCategory } from '../api/mockMeals';
import Spinner from '../components/Spinner';

const CategoryMeals = () => {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Show mock data immediately for better UX
    const mockData = mockMealsByCategory[categoryName] || [];
    setMeals(mockData);
    setLoading(false);
    
    // Try to fetch real data in background
    fetchMealsByCategory(categoryName)
    .then((response) => {
      if (response.data && response.data.meals) {
        setMeals(response.data.meals);
      }
    })
    .catch((err) => {
      console.error('Error fetching meals:', err);
      // Mock data is already set, so no action needed
    }); 
  }, [categoryName]);

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
          {categoryName} Recipes
        </h1>
        <p className="text-gray-600">
          {meals.length} delicious {categoryName.toLowerCase()} recipes to explore
        </p>
      </div>

      {meals.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No recipes found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
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
                  <p className="text-emerald-600 text-sm font-medium">
                    View Recipe →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryMeals;