# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Recipe Discovery App
Overview
For this project, you will build a client-side “Recipe Discovery” application. This project will serve as a comprehensive demonstration of your mastery of advanced React concepts. The application will allow users to browse recipes by category, search for specific recipes, view detailed recipe information, and manage a personal list of “favorite” recipes.

You will use a free, public API for recipe data and implement a varietys of hooks, state management patterns, and routing solutions to create a feature-rich, single-page application (SPA).

Time Allocation
In-class time: 3.5 hours
Outside of class: At instructor’s discretion
Core Requirements
You will build a Recipe Discovery application using the TheMealDB API (a free API, no key required).

1. State Management & Data Fetching
Use the useState and useEffect hooks to fetch and display data from the API.
Your application should manage loading and error states gracefully, displaying appropriate UI indicators to the user (e.g., a loading spinner, an error message).
2. Custom Hooks
You must create and implement at least two custom hooks:

useFetch (or similar): A generic custom hook for handling data fetching logic. It should manage the data, loading state, and error state. This hook will be used throughout your application to communicate with the API.
useLocalStorage: A custom hook to synchronize a piece of state with the browser’s localStorage. This will be used to persist the user’s list of favorite recipes.
3. Global State with Context API
Create a FavoritesContext to manage the user’s list of favorite recipes globally.
The context must provide:
A list of favorite recipe IDs.
A function to add a recipe to favorites.
A function to remove a recipe from favorites.
A function to check if a recipe is already in favorites.
This context should use your useLocalStorage hook internally to persist the favorites list across browser sessions.
4. Routing
Your application must include the following pages and routing logic:

Home Page (/):
Displays a grid or list of all available recipe categories fetched from the API.
Each category should be a link that navigates to its respective category page.
Category Page (/category/[categoryName]):
A dynamic route that displays all recipes belonging to the category specified in the URL (e.g., /category/Seafood).
Each recipe shown should be a link to its detailed recipe page.
Recipe Detail Page (/recipe/[recipeId]):
A dynamic route that fetches and displays the full details for a single recipe (image, ingredients, instructions, etc.).
This page must include a button to “Add to Favorites” or “Remove from Favorites”. The button’s state and action should be handled by your FavoritesContext.
Favorites Page (/favorites):
Displays a list of all recipes that the user has marked as a favorite.
If the user has no favorites, this page should display a message prompting them to browse and add some.
Search Functionality:
A search bar, likely in a shared Navbar, that allows users to search for recipes by name.
Submitting a search should navigate the user to a search results page (e.g., /search?query=Arrabiata). This page will display the results of the search query.
5. Components & UI
Create reusable, well-styled components (e.g., RecipeCard, Navbar, Spinner, ErrorMessage).
The application should be visually appealing and responsive. Use of a CSS framework, CSS-in-JS, or CSS Modules is up to you.
TheMealDB API Endpoints
The following endpoints are available for use, but are only examples. You will need to explore the API documentation  and use the endpoints that best fit the needs of your application.

List all categories: https://www.themealdb.com/api/json/v1/1/categories.php
Filter by category: https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
Lookup full recipe details by ID: https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
Search meal by name: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
Submission Guidelines
GitHub Repository: A link to a public GitHub repository containing the complete source code for your project.
README.md: The repository must include a README.md file that contains:
A brief description of the application and its features.
Instructions on how to install dependencies and run the project locally.
Reflection: A short section in your README.md or in a separate REFLECTION.md file detailing:
The most challenging part of the project for you.
A brief explanation of a design decision you made (e.g., why you structured a hook a certain way, how you decided to manage a piece of state).

# Recipe Discovery App
Deployment Link: https://6a024c489148207b2ff5f440--recipe-discovery-sba10.netlify.app/

## Overview

A comprehensive Recipe Discovery application built with React that allows users to explore recipes from around the world. This single-page application demonstrates advanced React concepts including custom hooks, Context API for state management, and dynamic routing. Users can browse recipes by category, search for specific dishes, view detailed recipe information, and manage their personal list of favorite recipes.

## Features

- **Recipe Categories**: Browse 14 different recipe categories (Beef, Chicken, Dessert, Seafood, etc.)
- **Category Filtering**: View all recipes within a specific category
- **Recipe Details**: View complete recipe information including ingredients, measurements, and instructions
- **Search Functionality**: Search for recipes by name with real-time results
- **Favorites System**: Add/remove recipes to favorites with persistent localStorage storage
- **Responsive Design**: Beautiful, mobile-friendly interface using Tailwind CSS
- **Fast Loading**: Optimized performance with mock data fallbacks for instant loading
- **Error Handling**: Graceful error handling with user-friendly messages

## Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v7
- **State Management**: Context API with custom hooks
- **Styling**: Tailwind CSS v4
- **API**: TheMealDB API with fallback mock data
- **HTTP Client**: Axios
- **Storage**: localStorage for favorites persistence

## Application Structure

```
src/
├── components/          # Reusable components
│   ├── FavContext.jsx  # Favorites context provider
│   ├── Header.jsx      # Navigation header with search
│   ├── RecipeCard.jsx  # Recipe card component
│   └── Spinner.jsx     # Loading spinner
├── pages/              # Page components
│   ├── Home.jsx        # Categories listing
│   ├── CategoryMeals.jsx  # Category-specific recipes
│   ├── RecipeDetail.jsx   # Individual recipe details
│   ├── SearchResults.jsx  # Search results page
│   └── Favorites.jsx      # User's favorite recipes
├── hooks/              # Custom React hooks
│   ├── useFetch.js     # Generic data fetching hook
│   └── useLocalStorage.js  # localStorage synchronization hook
├── api/                # API and mock data
│   ├── mealdb.js       # API calls with fallbacks
│   ├── mockData.js     # Mock categories
│   ├── mockMeals.js    # Mock meals by category
│   └── mockRecipeDetails.js  # Detailed recipe data
└── App.jsx             # Main application component
```

## API Integration

The application uses TheMealDB API (https://www.themealdb.com/api/json/v1/1/) with the following endpoints:

- **Categories**: `/categories.php`
- **Filter by Category**: `/filter.php?c={categoryName}`
- **Recipe Details**: `/lookup.php?i={recipeId}`
- **Search**: `/search.php?s={query}`

**Fallback System**: When the API is unavailable or slow, the application seamlessly switches to comprehensive mock data, ensuring a smooth user experience.

## Reflection

### Most Challenging Part

The most challenging part of this project was implementing a robust fallback system for API failures. The TheMealDB API frequently experienced timeouts and connectivity issues during development. I solved this by creating a comprehensive mock data system that provides realistic recipe information and implementing a timeout mechanism that gracefully falls back to mock data when the API doesn't respond within 3 seconds. This required careful data structure design to ensure the mock data matched the API response format exactly.

### Design Decision: Immediate Loading with Background Updates

A key design decision I made was to implement an "immediate loading" strategy. Instead of showing a spinner while waiting for API responses, the application displays mock data instantly and attempts to fetch real data in the background. This approach:

1. **Improves User Experience**: Users see content immediately without waiting
2. **Maintains Data Freshness**: Real data updates when available
3. **Handles API Failures Gracefully**: The app remains functional even with complete API failure
4. **Reduces Perceived Loading Time**: No spinner delays create a faster-feeling application

This pattern is implemented in both the Home page (categories) and CategoryMeals page (recipes), ensuring consistent performance across the application. The useLocalStorage hook was also designed to be generic and reusable, automatically handling JSON serialization/deserialization and providing a clean API for any component that needs localStorage synchronization.