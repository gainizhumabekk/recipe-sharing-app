import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const recipes = await prisma.recipe.findMany();
    return res.status(200).json(recipes);
  }

  if (req.method === "POST") {
    const { title, description, category, ingredients, steps, isPublic, imageUrl } = req.body;
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        category,
        ingredients,
        steps,
        isPublic,
        imageUrl,
        userId: 1, // Replace with the logged-in user's ID
      },
    });
    return res.status(201).json(recipe);
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
