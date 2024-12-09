import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function NewRecipe() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formula, setFormula] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    // Upload image to a cloud service (e.g., Cloudinary) if required
    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary preset

      const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      imageUrl = data.secure_url;
    }

    // Send recipe data to API
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        formula,
        imageUrl, // Pass the uploaded image URL
      }),
    });

    if (res.ok) {
      alert("Recipe added successfully!");
      router.push("/recipes"); // Redirect to recipes page
    } else {
      alert("Failed to add recipe.");
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold">Recipe Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full p-2"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-bold">Formula (Instructions)</label>
          <textarea
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            className="border rounded w-full p-2"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-bold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border rounded w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Recipe
        </button>
      </form>
    </Layout>
  );
}
