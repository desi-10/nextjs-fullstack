import Link from "next/link";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/home", {
    cache: "no-cache",
  });
  return await res.json();
};

export default async function Home() {
  const { data } = await getData();

  return (
    <main className="p-5">
      <p className="text-2xl text-blue-700 bg-blue-200 px-3 py1 rounded w-fit">
        All Posts
      </p>
      <section className="space-y-5 mt-5">
        {data.map((item: any) => {
          return (
            <div key={item.id} className="">
              <Link href={`/posts/${item.id}`}>
                <p>{item.name}</p>
                <p>{item.post}</p>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
