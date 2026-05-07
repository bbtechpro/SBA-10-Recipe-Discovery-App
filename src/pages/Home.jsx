import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../components/Spinner";
import { fetchCategories } from "../api/mealdb";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCategories()
    .then((res) => setCategories(res.data.categories))
    .catch((err) => console.log(err))
    .finally(() => {
      setLoading(false);
    }); 
  }, []);

  if (loading) return <Spinner />;

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
