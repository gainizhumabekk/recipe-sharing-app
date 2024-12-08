export default function Home() {
  return (
    <div>
      <h1>Welcome to Recipe Sharing App!</h1>
      <p>Use the navigation menu to log in or register and explore recipes.</p>
    </div>
  );
}

import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <h1>Welcome to Recipe Sharing App!</h1>
      <p>Use the navigation menu to log in, register, and explore recipes.</p>
    </Layout>
  );
}

