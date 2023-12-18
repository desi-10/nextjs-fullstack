"use client";
import React, { FormEvent } from "react";

const Posts = () => {
  const addPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          post: formData.get("post"),
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="grid place-items-center mt-5">
      <h1 className="text-2xl">Posts</h1>

      <form onSubmit={addPost}>
        <div className="grid">
          <label htmlFor="">Author</label>
          <input
            type="text"
            name="name"
            required
            className="rounded border mb-3"
          />
        </div>
        <div className="grid">
          <label htmlFor="">Post</label>
          <input
            type="text"
            name="post"
            required
            className="rounded border mb-3"
          />
        </div>
        <button className="bg-blue-500 w-full rounded text-white">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Posts;
