import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, description, formula, imageUrl } = req.body;

    if (!name || !description || !formula) {
      console.error("Missing required fields:", { name, description, formula });
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      const recipe = await prisma.recipe.create({
        data: {
          name,
          description,
          formula,
          imageUrl: imageUrl || null, // Optional image URL
        },
      });
      res.status(201).json(recipe);
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ error: "Failed to create recipe." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
