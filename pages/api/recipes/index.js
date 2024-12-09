import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Received POST request");
    console.log("Request body:", req.body);

    const { name, description, formula, imageUrl } = req.body;

    if (!name || !description || !formula) {
      console.error("Missing required fields");
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      console.log("Inserting recipe into database...");
      const recipe = await prisma.recipe.create({
        data: {
          name,
          description,
          formula,
          imageUrl: imageUrl || null,
        },
      });
      console.log("Recipe created successfully:", recipe);
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
