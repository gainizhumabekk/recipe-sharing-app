import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchRecipe() {
        const res = await fetch(`/api/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
      }
      fetchRecipe();
    }
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Category: {recipe.category}</p>
      <p>Ingredients: {recipe.ingredients.join(", ")}</p>
      <p>Steps: {recipe.steps.join(". ")}</p>
    </div>
  );
}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const recipe = await prisma.recipe.findUnique({
      where: { id: parseInt(id) },
    });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  }
}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "POST") {
    // Update the recipe or user's favorites list
    // Example implementation:
    res.status(200).json({ message: "Recipe favorited!" });
  }
}
