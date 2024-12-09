import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-8">Welcome to Recipe Sharing App!</h1>
        <p className="mt-4 text-lg">
          Use the navigation menu to log in, register, and explore recipes!
        </p>
      </div>
    </Layout>
  );
}
