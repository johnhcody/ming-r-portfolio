import React, { useState, useEffect } from 'react'
import { NextPage } from 'next';
import BaseLayout from '../components/layouts/BaseLayout'
import Footer from '../components/shared/Footer'
import { useGetUser } from '../actions/user'
import axios from 'axios'
import BlogPost from '../components/blog/BlogPost'
import NavBar from '../components/shared/Navbar'


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

    const [ scrolled, setScrolled ] = useState(false);

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
      }, []);

      const handleScroll = () => {
        if (window.pageYOffset > 47 && window.pageYOffset < 900) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }
    return (
        <>
            <BaseLayout data={data} loading={loading}>
            {scrolled ? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
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