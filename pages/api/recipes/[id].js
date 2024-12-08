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
