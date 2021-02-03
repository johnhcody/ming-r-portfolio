import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useGetUser } from '../../actions/user'
import axios from 'axios'
import { useRouter } from 'next/router';

interface ProjectProps {
    project: {
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
        _id: string;
    }
}
  

const ProjectCard: React.FC<ProjectProps> = props => {

    const { project } = props;
    const {data, loading} = useGetUser();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
    }

    useEffect(() => {
        if (isDeleting) {
            deleteArticle();
        }
    }, [isDeleting])

    const router = useRouter();

    const deleteArticle = async () => {
        debugger
        const deleted = await axios.delete(`/api/projects/${project._id}`)
        router.push('/');
    }

    const truncatedText = project.description.length > 150 ? project.description.slice(0, 147) + "..." : project.description
                return (
                    // <div className="max-w-xs rounded overflow-hidden shadow-lg my-12 mx-8">
                    //     <img className="w-full h-48" src={`${project.mainPhoto}`} alt="" />
                    //     <div className="px-6 py-4">
                    //         <div className="font-bold text-xl mb-2">{project.title}</div>
                    //         <p className="text-grey-darker text-base">{project.intro}</p>
                    //         <p className="text-grey-darker text-base pt-4">{truncatedText}</p>
                    //     </div>
                    //     <div className="px-6 py-4">
                    //         <Link
                    //         href={`/projects/${project._id}`}>
                    //             <button className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 transition duration-300 ease-in-out mr-6" >Read More</button>
                    //         </Link>
                    //     </div>
                    // </div>
                    <>
                    <div className="flex flex-col items-center">
                    <Link href={`/projects/${project._id}`} >
                        
                        <div className="wrapper bg-white antialiased text-gray-900 mt-12 max-w-sm mx-4">
                            <div>
                                
                                <img src={`${project.mainPhoto}`} alt="" className="w-full h-80 w-auto object-cover object-center rounded-lg shadow-md"/>    
                                
                            <div className="relative px-4 -mt-16">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                {/* <div className="flex items-baseline">
                                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                                New
                                </span>
                                <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                                2 baths  &bull; 3 rooms
                                </div>  
                            </div> */}
                                
                                <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{project.title}</h4>
                            
                            <div className="mt-1">
                                <h2 className="text-gray-600 text-sm">{truncatedText}</h2>
                            </div>
                            <div className="mt-4">
                                {/* <a className="text-sm text-gray-600" href={`${project.linkUrl}`}>{project.linkDescription}</a> */}
                            </div>  
                            </div>
                            </div>
                            
                            </div>
                            </div>
                    </Link>
                    <div className="idx-itm-btn-wrapper mt-48">
                            {data && data.name == "john.haner.cody@gmail.com" ? <><Link href={`/projects/${project._id}/edit`}>
                                <button className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 transition duration-300 ease-in-out mr-6" >Edit</button>
                            </Link><button onClick={handleDelete} className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 transition duration-300 ease-in-out mr-6" >Delete</button></> : null}
                            
                    </div>
                    </div>
                    </>
                )

    
}

export default ProjectCard;