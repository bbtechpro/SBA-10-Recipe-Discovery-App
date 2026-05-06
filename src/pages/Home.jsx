import { useEffect, useState } from 'react';
import spinner from "../components/Spinner";
import { fetchCategories } from "../api/mealdb";

// const [recipes, setRecipes] = useState([]);

// useEffect(() => {
//   fetch('https://themealdb.com')
//     .then(res => res.json())
//     .then(data => setRecipes(data.meals));
// }, []);

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
  return 
    <div> className="max-w-6xl mx-auto p-3"Home</div>;
}

export default Home;
