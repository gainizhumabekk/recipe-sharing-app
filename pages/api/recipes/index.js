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
