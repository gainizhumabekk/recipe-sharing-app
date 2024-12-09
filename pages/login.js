import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false, // Prevent auto-redirection
      email,
      password,
      callbackUrl: "/recipes/new", // Redirect to the "Add Recipe" page
    });

    if (result?.error) {
      setErrorMessage("Invalid email or password.");
    } else if (result?.url) {
      window.location.href = result.url; // Redirect to the provided URL
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
