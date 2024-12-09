import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, description, formula, imageUrl } = req.body;

    try {
      const recipe = await prisma.recipe.create({
        data: {
          name,
          description,
          formula,
          imageUrl,
        },
      });
      res.status(201).json(recipe);
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ error: "Failed to create recipe." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export async function getServerSideProps() {
  const recipes = await prisma.recipe.findMany();
  return {
    props: { recipes },
  };
}
import Layout from "../components/Layout";

export default function RecipeList({ recipes }) {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{recipe.name}</h2>
            <p>{recipe.description}</p>
            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-auto" />}
            <p className="mt-2">{recipe.formula}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}