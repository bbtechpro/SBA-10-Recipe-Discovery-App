import { memo } from 'react';

const Header = () => {
  return (
    <header className="bg-emerald-900  text-white p-4 shadow">
        <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-6">
            <a href="#" className="text-x1 font-bold">MealDB</a>
            <a href="#" className="text-x1">Categories</a>
            <a href="#" className="text-x1">Favorites</a>
    </div>

    <form className="flex gap-2">
      <input type="text" className="bg-white px-3 py-1 rounded outline-none text-gray-800 w-48 sm:w-64" placeholder="Search meals" />
      <button className="bg-white text-emerald-900 px-3 py-1 rounded hover:bg-gray-100">Search</button>
    </form>
   </nav>
  </header>
  );
};

export default memo(Header);