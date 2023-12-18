import { TParams } from "@/app/api/posts/[id]/route";
import React from "react";

export const getSinglePost = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-cache",
  });
  return await res.json();
};

const GetPost = async ({ params: { id } }: TParams) => {
  const { data } = await getSinglePost(id);

  return (
    <section key={data.id} className="mt-5 grid justify-center items-center">
      <h1 className="text-2xl">{data.id}</h1>
      <p>{data.name}</p>
      <p>{data.post}</p>
    </section>
  );
};

export default GetPost;
