"use client";

export default function DeleteButton({id}: {id: string}) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      try {
const res = await fetch('/api/posts/${id}', {
method: "DELETE", 
headers: {
"Content-type": "application/json",
},
});

if (res.ok) {
console.log("Post deleted");
}
        // Code to handle deletion will go here
      } catch (error) {
        console.error(error);
      }
    }
  };
return (
  <button onClick={handleDelete} className="text-red-600">
    Delete
  </button>
);
}