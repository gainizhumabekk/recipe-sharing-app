export default function Layout({ children }) {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-center">Recipe Sharing App</h1>
        <nav className="flex justify-center space-x-4">
          <a href="/" className="text-white">Home</a>
          <a href="/register" className="text-white">Register</a>
          <a href="/login" className="text-white">Login</a>
          <a href="/recipes" className="text-white">Recipes</a>
        </nav>
      </header>
      <main className="p-4">{children}</main>
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Recipe Sharing App
      </footer>
    </div>
  );
}
