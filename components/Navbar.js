import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/recipes">View Recipes</Link>
        </li>
        <li>
          <Link href="/recipes/new">Add Recipe</Link>
        </li>
      </ul>
    </nav>
  );
}
