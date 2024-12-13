import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) } });
      if (recipe) res.status(200).json(recipe);
      else res.status(404).json({ error: "Recipe not found." });
    } catch {
      res.status(500).json({ error: "Failed to fetch recipe." });
    }
  } else if (req.method === "PUT") {
    const { name, description, formula, image } = req.body;
    try {
      const updatedRecipe = await prisma.recipe.update({
        where: { id: Number(id) },
        data: { name, description, formula, image },
      });
      res.status(200).json(updatedRecipe);
    } catch {
      res.status(500).json({ error: "Failed to update recipe." });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.recipe.delete({ where: { id: Number(id) } });
      res.status(204).end();
    } catch {
      res.status(500).json({ error: "Failed to delete recipe." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
