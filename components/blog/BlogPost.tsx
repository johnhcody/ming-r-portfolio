import React, { useState } from 'react'
import Link from 'next/link'
import { useGetUser } from '../../actions/user'


interface Props {
    title: string;
    intro: string;
    description: string;
    paragraphs: number[];
    photos: number[];
    order: number[];
    linkUrl: string;
    linkDescription: string;
}


export const BlogPost = (props: Props) => {

    const { blog } = props;
    const [hover, setHover] = useState(false)
    const truncatedText = blog.description.length > 150 ? blog.description.slice(0, 147) + "..." : blog.description
    debugger
                return (
                    <div className="max-w-xs rounded overflow-hidden shadow-lg my-12">
                        <img className="w-full" src={`${blog.photos[0]}`} alt="Sunset in the mountains" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{blog.title}</div>
                            <p className="text-grey-darker text-base">{blog.intro}</p>
                            <p className="text-grey-darker text-base pt-4">{truncatedText}</p>
                        </div>
                        <div className="px-6 py-4">
                            <Link
                            href={`/${blog._id}`}>
                                <button className="bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6" >Read More</button>
                            </Link>
                        </div>
                    </div>
                )

    
}

export default BlogPost;