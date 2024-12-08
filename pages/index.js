import Layout from "../components/Layout";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Recipe Sharing App!</h1>
      <p>Use the navigation menu to log in or register and explore recipes.</p>
    </div>
  );
};

Home.getInitialProps = async () => {
  const data = await fetchSomeData();
  return { data };
};


