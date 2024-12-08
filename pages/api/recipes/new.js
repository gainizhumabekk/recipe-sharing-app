import { useState } from "react";

export default function NewRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        category,
        ingredients: ingredients.split(","),
        steps: steps.split("."),
        isPublic,
      }),
    });
    if (res.ok) {
      alert("Recipe created!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a New Recipe</h1>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
          <option value="Desserts">Desserts</option>
        </select>
      </label>
      <label>
        Ingredients (comma-separated):
        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      </label>
      <label>
        Steps (period-separated):
        <textarea value={steps} onChange={(e) => setSteps(e.target.value)} />
      </label>
      <label>
        Public:
        <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
import Layout from "../components/Layout";

export default function RecipeList({ recipes }) {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      <div className="grid grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-bold">{recipe.title}</h2>
            <p>{recipe.description}</p>
            <a href={`/recipes/${recipe.id}`} className="text-blue-500">View Details</a>
          </div>
        ))}
      </div>
    </Layout>
  );
}

