export default function RecipeCard({ recipe }) {
  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}
    </div>
  );
}
