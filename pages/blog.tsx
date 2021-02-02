import React, { useState } from 'react'
import { NextPage } from 'next';
import BaseLayout from '../components/layouts/BaseLayout'
import Footer from '../components/shared/Footer'
import { useGetUser } from '../actions/user'
import axios from 'axios'
import BlogPost from '../components/blog/BlogPost'

interface BlogProps {
    blogs: {
        title: string,
        intro: string,
        description: string,
        paragraphs: number[],
        photos: number[],
        order: number[],
        linkUrl: string,
        linkDescription: string,
        mainPhoto: string,
        _id: string
    }[];
}


const Blog: NextPage<BlogProps> = props => {
    const { loading, data } = useGetUser();
    const blogs = Object.values(props);
    return (
        <>
            <BaseLayout data={data} loading={loading}>
                <div className="flex justify-center items-center flex-col py-12">
                    <h1 className="flex justify-center text-4xl font-sans" >Here's my Blog</h1>
                    <div className="flex flex-wrap">
                        {blogs.map(blog => {
                            return <BlogPost key={blog._id} blog={blog} />
                        })}
                    </div>
                </div>
                
                </BaseLayout>
            <Footer />
            </>
        )
}

Blog.getInitialProps = async () => {
    const res = await axios.get('/api/blogs');
    const blogs = res.data['data'];
    return blogs;
}

export default Blog