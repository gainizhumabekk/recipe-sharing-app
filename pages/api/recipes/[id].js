import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query; // Extract the recipe ID from the URL

  if (req.method === "GET") {
    try {
      console.log("Fetching recipe with ID:", id);
      const recipe = await prisma.recipe.findUnique({
        where: { id },
      });

      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found." });
      }

      res.status(200).json(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ error: "Failed to fetch recipe." });
    }
  } else if (req.method === "PUT") {
    try {
      console.log("Updating recipe with ID:", id);
      const { name, description, formula, imageUrl } = req.body;

      if (!name || !description || !formula) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const updatedRecipe = await prisma.recipe.update({
        where: { id },
        data: { name, description, formula, imageUrl },
      });

      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).json({ error: "Failed to update recipe." });
    }
  } else if (req.method === "DELETE") {
    try {
      console.log("Deleting recipe with ID:", id);
      await prisma.recipe.delete({
        where: { id },
      });

      res.status(204).end(); // No content response
    } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ error: "Failed to delete recipe." });
    }
  } else {
    // If the HTTP method is not supported
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
