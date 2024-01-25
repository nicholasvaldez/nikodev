import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Button from '@/app/components/mdx/Button'
import rehypeHighlight from 'rehype-highlight';
import "@/styles/highlight-js/github-dark.css"

const options = {
    mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [rehypeHighlight],
    }
}

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join('blogs'))

    const paths = files.map(filename => ({
        slug: filename.replace('.mdx', '')
    }))

    return paths
}

function getPost({slug}:{slug : string}){
    const markdownFile = fs.readFileSync(path.join('blogs',slug + '.mdx'), 'utf-8')

    const { data: frontMatter, content } = matter(markdownFile)

    return {
        frontMatter,
        slug,
        content
    }
}



export default function Post({ params } :any) {
    const props = getPost(params);

    return (
        <article>
          
                <h1 className="text-3xl font-black font-montserrat text-[40px] leading-[44px]">{props.frontMatter.title}</h1>
                <p className='text-sm font-merriweather mt-2 text-gray-400'>{props.frontMatter.date}</p>
          
            <div className='prose prose-sm md:prose-base lg:prose-base prose-slate !prose-invert font-merriweather mt-10'>
                {/* @ts-expect-error Server Component*/}
                <MDXRemote source={props.content} components={{Button}} options={options}/>
            </div>
        </article>
    )
}

export async function generateMetadata({ params } : any) {
    const blog = getPost(params);

    return{
        title: blog.frontMatter.title,
        description: blog.frontMatter.description,
    }
}