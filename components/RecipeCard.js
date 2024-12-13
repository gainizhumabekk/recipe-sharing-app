export default function RecipeCard({ recipe }) {
  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <p>{recipe.formula}</p>
      {recipe.image && <img src={recipe.image} alt={recipe.name} />}
    </div>
  );
}
