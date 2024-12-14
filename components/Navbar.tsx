import Link from "next/link";

export default function Navbar() {
  return (
<div className="flex justify-between pb-4 border-b mb-4">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">Recipe Sharing</h1>
        </Link>
        <p className="text-sm">
          Simple recipes made for everyday life, <br /> Share your favorite!
	 </p>
      </div>

      <div className="flex items-center">
        <Link className="btn" href={"/sign-in"}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
