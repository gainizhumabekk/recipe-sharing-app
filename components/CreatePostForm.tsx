"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TCategory } from '@/app/types';
import { useRouter } from 'next/navigation';

export default function CreatePostForm() {
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [publicId, setPublicId] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch('/api/categories');
      const catNames = await res.json();
      setCategories(catNames);
    };

    fetchAllCategories();
  }, []);

  const addLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (linkInput.trim() !== '') {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput('');
    }
  };

  const deleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    try {
      const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          links,
          selectedCategory,
          imageUrl,
          publicId,
        }),
      });

      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>

        {links &&
          links.map((link, i) => (
            <div key={i} className="flex items-center gap-4">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              </span>
              <Link className="link" href={link}>
                {link}
              </Link>

              <span
                className="cursor-pointer"
                onClick={() => deleteLink(i)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </span>
            </div>
          ))}

        <div className="flex gap-2">
          <input
            className="flex-1"
            type="text"
            onChange={(e) => setLinkInput(e.target.value)}
            value={linkInput}
            placeholder="Paste the link and click on Add"
          />
          <button onClick={addLink} className="btn flex gap-2 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
            </span>
            Add
          </button>
        </div>

        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-md border appearance-none"
        >
          <option value="">Select A Category</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.catName}>
                {category.catName}
              </option>
            ))}
        </select>

        <button className="primary-btn" type="submit">
          Create Post
        </button>

        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
      </form>
    </div>
  );
}