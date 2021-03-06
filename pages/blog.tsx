import React, { useState, useEffect } from 'react'
import { NextPage } from 'next';
import BaseLayout from '../components/layouts/BaseLayout'
import Footer from '../components/shared/Footer'
import { useGetUser } from '../actions/user'
import axios from 'axios'
import BlogPost from '../components/blog/BlogPost'
import NavBar from '../components/shared/Navbar'
import Link from 'next/link'

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
    const blogs = Object.values(props).filter(el => el.type == "Blog");

    const [ scrolled, setScrolled ] = useState(false);

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
      }, []);

      const handleScroll = () => {
        if (window.pageYOffset > 47) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    const [width, setWidth] = useState(null);
        function handleWindowSizeChange() {
                setWidth(window.innerWidth);
            }

    useEffect(() => {
        if (typeof window !== 'undefined') setWidth(window.innerWidth)
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

        let isMobile: boolean = (width <= 768);
    return (
        <>
            <BaseLayout data={data} loading={loading}>
            {scrolled && !isMobile ? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
                <div className="flex justify-center items-center flex-col">
                    <h1 className="flex justify-center text-4xl font-sans pt-24 pb-12" >Here's my Blog</h1>
                    <div className="flex flex-wrap">
                        {blogs.map(blog => {
                            return <BlogPost key={blog._id} blog={blog} />
                        })}
                    </div>
                </div>
                {data && data.name == "john.haner.cody@gmail.com" ? 
                <div className="flex justify-center py-4">
                    <Link href={`/create-new`}>
                        <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 transition duration-300 ease-in-out mr-6" >New Blog</button>
                    </Link>
                </div> : null }
                <div className="h-40"></div>
                </BaseLayout>
            <Footer />
            </>
        )
}

Blog.getInitialProps = async () => {
    // const res = await axios.get('localhost:3000/api/projects');
    const res = await axios.get('/api/projects/')
    const blogs = res.data['data'];
    return blogs;
}

export default Blog