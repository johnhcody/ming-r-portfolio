import axios from 'axios';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '../../../components/layouts/BaseLayout';
import Link from 'next/link';
import Footer from '../../../components/shared/Footer'
import { useGetUser } from '../../../actions/user'
import NavBar from '../../../components/shared/Navbar'
import ContentBody from '../../../components/shared/ContentBody';

interface Props {
    project: {
        title: string;
        intro: string;
        description: string;
        paragraphs: string[];
        photos: string[];
        order: string[];
        linkUrl: string;
        linkDescription: string;
        mainPhoto: string;
        _id: string;
    }
}


const Project: NextPage<Props> = ({ project }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
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


    useEffect(() => {
        if (isDeleting) {
            deleteBlogPost();
        }
    }, [isDeleting])

    const deleteBlogPost = async () => {
        const projectId = router.query.id;

        const deleted = await axios.delete(`/api/projects/${projectId}`)
        router.push('/');
    }

    const handleDelete = async () => {
        setIsDeleting(true);
    }

    const { loading, data } = useGetUser();

    return (
        <>
        <BaseLayout data={data} loading={loading}>
        {scrolled && !isMobile ? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
            <div className="flex justify-center items-center pt-24 flex-col">
                <h1 className="text-4xl py-4">{project.title}</h1>
                <img className="object-contain h-48 md:h-72 my-4 lg:h-96 w-full" src={`${project.mainPhoto}`} alt=""/>
                <h1 className="text-lg max-w-4/5 py-4">{project.description}</h1>
                <ContentBody body={project}/>
                {data && data.name == "john.haner.cody@gmail.com" ? 
                <>
                    <Link href={`/projects/${project._id}/edit`}>
                        <button className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 my-2 transition duration-300 ease-in-out mr-6" >Edit</button>
                    </Link>
                    <button onClick={handleDelete} className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 my-2 transition duration-300 ease-in-out mr-6" >Delete</button>
                </> : null
                }
            </div>
        </BaseLayout>
        <Footer />
        </>
    )

}

Project.getInitialProps = async ({ query: { id }}) => {
    const res = await axios.get(`/api/projects/${id}`)
    const data = res.data['data'];

    return { project: data }
}

export default Project;