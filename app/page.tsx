import fs from "fs"
import path from "path"
import matter from "gray-matter"

import Link from "next/link"

export default function Home() {
  // 1) Set blogs directory
  const blogDir = "blogs"

  // 2) Find all files in the blog directory
  const files = fs.readdirSync(path.join(blogDir))

  // 3) For each blog found
  const blogs = files.map((filename) => {
    // 4) Read the content of that blog
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8")

    // 5) Extract the metadata from the blog's content
    const { data: frontMatter } = matter(fileContent)

    // 6) Return the metadata and page slug
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    }
  })
  return (
    <main className="flex flex-col">
      <h1 className="text-3xl font-bold font-montserrat">
        NikoDev<span className="text-5xl">.</span>
      </h1>

      <section className="py-10">
        <div className="py-2">
          {blogs.map((blog) => (
            <Link href={"/blogs/" + blog.slug} passHref key={blog.slug}>
              <div className="py-2 flex flex-col gap-1 transition ease-in-out hover:scale-[100.5%] duration-300">
                <h3 className="text-3xl font-bold font-montserrat">
                  {blog.meta.title}
                </h3>
                <p className="text-gray-400 text-sm font-merriweather">
                  {blog.meta.date}
                </p>
                <p className="text-gray-400 text-xl font-merriweather">
                  {blog.meta.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
