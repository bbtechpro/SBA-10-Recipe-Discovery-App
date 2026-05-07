import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-emerald-900 text-white p-4 shadow">
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold hover:text-emerald-200 transition-colors">
            🍽️ Recipe Discovery
          </Link>
          <Link 
            to="/" 
            className="text-lg hover:text-emerald-200 transition-colors"
          >
            Categories
          </Link>
          <Link 
            to="/favorites" 
            className="text-lg hover:text-emerald-200 transition-colors"
          >
            Favorites
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white px-3 py-2 rounded outline-none text-gray-800 w-48 sm:w-64" 
            placeholder="Search recipes..." 
          />
          <button 
            type="submit"
            className="bg-white text-emerald-900 px-4 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
          >
            Search
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;