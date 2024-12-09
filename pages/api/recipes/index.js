import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Handle fetching all recipes
    try {
      const recipes = await prisma.recipe.findMany();
      res.status(200).json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ error: "Failed to fetch recipes." });
    }
  } else if (req.method === "POST") {
    // Handle creating a new recipe
    const { name, description, formula, imageUrl } = req.body;

    if (!name || !description || !formula) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      const newRecipe = await prisma.recipe.create({
        data: {
          name,
          description,
          formula,
          imageUrl: imageUrl || null, // Optional: set image URL if provided
        },
      });
      res.status(201).json(newRecipe);
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ error: "Failed to create recipe." });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
