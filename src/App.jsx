
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import CategoryMeals from './pages/CategoryMeals';
import SearchResults from './pages/SearchResults';
import { FavProvider } from './components/FavContext';
import './App.css'
import Header from './components/Header';

function App() {
  return (
    <FavProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/category/:categoryName" element={<CategoryMeals />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </FavProvider>
  );
}
export default App;