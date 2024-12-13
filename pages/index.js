import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Recipe Sharing App!</h1>
      <p>Use the navigation menu to log in, register, and explore recipes!</p>
      <Link href="/recipes">
        <button>Get Started</button>
      </Link>
    </div>
  );
}
