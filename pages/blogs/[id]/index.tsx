import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '../../../components/layouts/BaseLayout';
import Link from 'next/link';
import { Footer } from '../../../components/shared/Footer'
import { useGetUser } from '../../../actions/user'


const Blog = ({ blog }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();


    useEffect(() => {
        if (isDeleting) {
            deleteBlogPost();
        }
    }, [isDeleting])

    const deleteBlogPost = async () => {
        const blogId = router.query.id;

        const deleted = await axios.delete(`/api/blogs/${blogId}`)
        router.push('/');
    }

    const handleDelete = async () => {
        setIsDeleting(true);
    }

    const blogBody = () => {

        const bodyOrder = blog.order.slice();
        const bodyPhotos = blog.photos.slice();
        const bodyParagraphs = blog.paragraphs.slice();

        const body = bodyOrder.map((el, idx) => {
            if (el == 'photo') {
                return <img className="max-w-2xl  h-auto py-4" key={idx} src={`${bodyPhotos.shift()}`} alt=""/>
            } else {
                return <p className="max-w-4xl py-4" key={idx} >{bodyParagraphs.shift()}</p>
            }
        })

        return (
            <div className="flex justify-center flex-col items-center" >{body}</div>
        )
    }

    const { loading, data } = useGetUser();
    
    return (
        <>
        <BaseLayout data={data} loading={loading}>
            <div className="flex justify-center items-center flex-col">
                <h1 className="text-4xl py-4">{blog.title}</h1>
                <img className="py-4" src={`${blog.mainPhoto}`} alt=""/>
                <h1 className="max-w-screen-md py-4">{blog.description}</h1>
                <div className="flex justify-center flex-col">
                    {blogBody()}
                </div>
                <button onClick={handleDelete} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-full outline:none" >Delete</button>
                <Link href={`/blogs/${blog._id}/edit`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-full outline:none" >Edit</button>
                </Link>
            </div>
        </BaseLayout>
        <Footer />
        </>
    )

}

Blog.getInitialProps = async ({ query: { id }}) => {
    const res = await axios.get(`/api/blogs/${id}`)
    const data = res.data['data'];

    return { blog: data }
}

export default Blog;