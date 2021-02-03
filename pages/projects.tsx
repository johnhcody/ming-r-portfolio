import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';
import { useGetUser } from '../actions/user'
import axios from 'axios'
import BaseLayout from '../components/layouts/BaseLayout'
import NavBar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import Link from 'next/link'
import ProjectCard from '../components/projects/ProjectCard'

interface Props {
    title: string;
    intro: string;
    type: string;
    description: string;
    paragraphs: number[];
    photos: number[];
    order: number[];
    linkUrl: string;
    linkDescription: string;
    mainPhoto: string;
}


const Project: NextPage<Props> = props => {
    const { loading, data } = useGetUser();
    debugger
    const projects = Object.values(props).filter(el => el.type == "Project");
    // filter through projects where type == Project
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

    const [ hidden, setHidden ] = useState(false);
    
    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, []);

    const handleResize = () => {
        if (window.innerWidth <= 700) {
            setHidden(true);
        } else {
            setHidden(false)
        }
    }
    return (
        <>
            <BaseLayout data={data} loading={loading}>
            {scrolled && !hidden ? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}

            <div className="flex justify-center items-center flex-col py-12">
                    <h1 className="flex justify-center text-4xl font-sans" >Projects from my Career</h1>
                    <div className="flex justify-center flex-wrap mx-4">
                        {projects.map(project => {
                            return <ProjectCard key={project._id} project={project} />
                        })}
                    </div>
                </div>
                {data && data.name == "john.haner.cody@gmail.com" ? 
                <div className="flex justify-center pt-12">
                    <Link href={`/create-new`}>
                        <button className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 transition duration-300 ease-in-out mr-6" >New Project</button>
                    </Link>
                </div> : null
                }


            </BaseLayout>
            <Footer />
            </>
        )
}

Project.getInitialProps = async () => {
    const res = await axios.get('/api/projects/')
    const projects = res.data['data'];
    return projects;
}

export default Project;