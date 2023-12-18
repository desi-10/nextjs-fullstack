import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center p-3 border border-b-blue-300">
        <section className="flex space-x-5">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </section>
        <section>
          <Link href="/posts">Posts</Link>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
