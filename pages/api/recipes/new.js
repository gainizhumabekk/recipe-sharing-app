import { useState } from "react";

export default function NewRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [isPublic, setIsPublic] = useState(false);
const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

async function handleImageUpload() {
    const formData = new FormData();
    formData.append("file", image);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.url);
      alert("Image uploaded successfully!");
    } else {
      alert("Failed to upload image.");
    }
  }

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
