import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { MDXRemote } from 'next-mdx-remote/rsc'
import Button from '@/app/components/mdx/Button'


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
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert py-12'>
            <h1>{props.frontMatter.title}</h1>
            
            {/* @ts-expect-error Server Component*/}
            <MDXRemote source={props.content} components={{Button}}/>
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