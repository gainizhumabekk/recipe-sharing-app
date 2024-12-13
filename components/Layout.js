import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer>&copy; 2024 Recipe Sharing App</footer>
    </>
  );
}
