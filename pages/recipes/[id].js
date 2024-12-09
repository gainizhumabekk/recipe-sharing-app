import { getSession } from "next-auth/react";
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
    return res.status(200).json(recipe);
  }

  if (req.method === "DELETE") {
    await prisma.recipe.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Recipe deleted" });
  }

  res.status(405).json({ error: "Method not allowed" });
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
