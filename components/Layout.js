import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold">Recipe Sharing App</h1>
        </div>
        <div className="space-x-4">
          <Link href="/register">
            <a className="hover:underline">Register</a>
          </Link>
          <Link href="/login">
            <a className="hover:underline">Login</a>
          </Link>
        </div>
      </header>

      <nav className="bg-gray-800 text-white p-2 flex space-x-4">
        <Link href="/recipes">
          <a className="hover:underline">View Recipes</a>
        </Link>
        <Link href="/recipes/new">
          <a className="hover:underline">Add Recipe</a>
        </Link>
      </nav>

      <main className="p-4">{children}</main>

      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Recipe Sharing App
      </footer>
    </div>
  );
}
