import { useState } from "react";
import { useRouter } from "next/router";

export default function NewRecipe() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formula, setFormula] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your-upload-preset"); // Set in your Cloudinary dashboard
    formData.append("cloud_name", "your-cloud-name");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url; // Returns the URL of the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await handleImageUpload(image);
      }

      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          formula,
          image: imageUrl,
        }),
      });

      if (response.ok) {
        alert("Recipe added successfully!");
        router.push("/recipes");
      } else {
        alert("Failed to add recipe. Please try again.");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Recipe Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="formula">Formula (Instructions):</label>
        <textarea
          id="formula"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          required
        ></textarea>

        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}
