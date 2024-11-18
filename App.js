import React, { useState } from "react";

// Assuming you have a fetchRecipes function, e.g., from an API
async function fetchRecipes(query) {
  const response = await fetch(`https://api.example.com/recipes?search=${query}`);
  const data = await response.json();
  return data.results;
}

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query) => {
    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      // Optionally, set an error state for user feedback
    }
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} width="200" />
            </div>
          ))
        ) : (
          <p>No recipes found. Try searching something!</p>
        )}
      </div>
    </div>
  );
}

// SearchBar component (simple example)
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for recipes"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default App;
