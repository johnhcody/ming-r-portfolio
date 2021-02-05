import React, { useState } from 'react'
import Link from 'next/link'
import { useGetUser } from '../../actions/user'


interface BlogPostProps {
    blog: {
        title: string;
        intro: string;
        description: string;
        paragraphs: number[];
        photos: number[];
        order: number[];
        linkUrl: string;
        linkDescription: string;
        mainPhoto: string;
        _id: string;
    }
}
  

const BlogPost: React.FC<BlogPostProps> = props => {

    const { blog } = props;
    const truncatedText = blog.description.length > 150 ? blog.description.slice(0, 147) + "..." : blog.description
                return (
                    <div className="max-w-xs rounded overflow-hidden shadow-lg my-12 mx-8">
                        <img className="w-full h-48" src={`${blog.mainPhoto}`} alt="" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 font-sans">{blog.title}</div>
                            <p className="`leading-normal font-sans text-grey-darker text-base">{blog.intro}</p>
                            <p className="leading-normal font-sans text-grey-darker text-base pt-4">{truncatedText}</p>
                        </div>
                        <div className="px-6 py-4">
                            <Link
                            href={`/projects/${blog._id}`}>
                                <button className="focus:outline-none font-sans focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 transition duration-300 ease-in-out mr-6" >Read More</button>
                            </Link>
                        </div>
                    </div>
                )

    
}

export default BlogPost;