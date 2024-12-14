import Post from "@/components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TPost } from "@/app/types";

const getPosts = async (email: string): Promise<TPost[] | null> => {
  try {
    const res = await fetch(${process.env.NEXTAUTH_URL}/api/authors/${email}, {
      cache: "no-store",
    });
    if (res.ok) {
      const { posts } = await res.json();
      return posts;
    }
    return null;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
    return null;
  }

  const email = session.user?.email;
  let posts: TPost[] = [];

  if (email) {
    posts = (await getPosts(email)) || [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>

      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={""} // You can fill this in if required
            authorEmail={post.authorEmail}
            date={post.createAt}
            thumbnail={post.imageUrl}
            category={post.catName}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div className="py-6">
          No posts created yet.{" "}
          <Link className="underline text-blue-600" href={"/create-post"}>
            Create New
          </Link>
        </div>
      )}
    </div>
  );
}