import { useEffect, useState } from "react";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch("/api/recipes");
      const data = await res.json();
      setRecipes(data);
    }
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <a href={`/recipes/${recipe.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json(recipes);
  }
}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, category, ingredients, steps, isPublic } = req.body;
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        category,
        ingredients,
        steps,
        isPublic,
        userId: 1, // Replace with logged-in user's ID.
      },
    });
    res.status(201).json(recipe);
  }
}
async function handleFavorite(id) {
  await fetch(`/api/recipes/favorite/${id}`, {
    method: "POST",
  });
  alert("Recipe added to favorites!");
}
const recipe = await prisma.recipe.create({
  data: {
    title,
    description,
    category,
    ingredients,
    steps,
    isPublic,
    imageUrl, // Save the uploaded image URL
    userId: 1, // Replace with logged-in user's ID
  },
});
