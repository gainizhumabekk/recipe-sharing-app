import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const recipes = await prisma.recipe.findMany();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipes." });
    }
  } else if (req.method === "POST") {
    const { name, description, formula, image } = req.body;

    try {
      const newRecipe = await prisma.recipe.create({
        data: {
          name,
          description,
          formula,
          image,
        },
      });
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a new recipe." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
