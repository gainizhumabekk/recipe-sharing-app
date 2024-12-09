import { PrismaClient } from "@prisma/client";
import Layout from "../../components/Layout";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const recipes = await prisma.recipe.findMany();
  return {
    props: { recipes }, // Pass recipes as props to the component
  };
}

export default function Recipes({ recipes }) {
  return (
    <Layout>
      <h1>Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found. Add a new recipe!</p>
      ) : (
        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <p>{recipe.formula}</p>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
