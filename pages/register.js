import React from "react";

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
