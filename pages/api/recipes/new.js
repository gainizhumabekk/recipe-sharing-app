import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function NewRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        ingredients: ingredients.split(","),
        steps: steps.split("."),
        isPublic,
      }),
    });

    if (response.ok) {
      alert("Recipe added successfully!");
      router.push("/recipes");
    } else {
      alert("Failed to add recipe.");
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full p-2"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-bold">Ingredients (comma-separated)</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Steps (period-separated)</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="border rounded w-full p-2"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-bold">Make Public</label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Recipe
        </button>
      </form>
    </Layout>
  );
}
