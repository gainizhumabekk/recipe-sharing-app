import { PrismaClient } from "@prisma/client";
import Layout from "../../components/Layout";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const recipes = await prisma.recipe.findMany();
  return {
    props: { recipes }, // Pass recipes as props to the component
  };
}

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
