import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-8">Welcome to Recipe Sharing App!</h1>
        <p className="mt-4 text-lg">
          Use the navigation menu to log in, register, and explore recipes!
        </p>
        <Link href="/register" className="bg-blue-500 text-white px-4 py-2 mt-4 inline-block rounded hover:bg-blue-700">
          Get Started
        </Link>
      </div>
    </Layout>
  );
}
