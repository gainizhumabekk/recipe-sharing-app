import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, ingredients, steps, isPublic } = req.body;

    try {
      const recipe = await prisma.recipe.create({
        data: {
          title,
          description,
          ingredients: ingredients,
          steps: steps,
          isPublic,
        },
      });
      return res.status(201).json(recipe);
    } catch (error) {
      console.error("Error creating recipe:", error);
      return res.status(500).json({ error: "Failed to create recipe." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}import Layout from "../components/Layout";

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
