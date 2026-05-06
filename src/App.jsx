
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites.jsx';
import { FavProvider } from './components/FavContext';
import './App.css'
import Header from './components/Header.jsx';

function App() {
  return (
    <FavProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
    </FavProvider>
  );
}
