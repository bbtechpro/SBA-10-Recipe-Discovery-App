import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../components/Spinner";
import { fetchCategories } from "../api/mealdb";
import { mockCategories } from "../api/mockData";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Show mock data immediately for better UX
    setCategories(mockCategories);
    setLoading(false);
    
    // Try to fetch real data in background
    fetchCategories()
    .then((res) => {
      if (res.data && res.data.categories) {
        setCategories(res.data.categories);
      }
    })
    .catch((err) => {
      console.error('Error fetching categories:', err);
      // Mock data is already set, so no action needed
    }); 
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-3">
      <div className="text-center mb-10 mt-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-emerald-900 tracking-tight">Browse Meal Categories</h1>
        <p>Discover delicious recipes from around the world</p>
        <div className="h-1 w-24 bg-emerald-600 rounded-full mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.strCategory} to={`/category/${cat.strCategory}`} className="group">
            <div className="w-full rounded-lg shadow group-hover:shadow-xl transition">
              <img 
                src={cat.strCategoryThumb} 
                alt={cat.strCategory} 
                className="w-full h-32 object-cover rounded-lg"
              />
              <p className="mt-2 text-emerald-800 font-medium text-center">{cat.strCategory}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
