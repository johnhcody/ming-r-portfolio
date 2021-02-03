import React from 'react'
import Link from 'next/link'

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
    const truncatedText = project.description.length > 150 ? project.description.slice(0, 147) + "..." : project.description
                return (
                    <div className="max-w-xs rounded overflow-hidden shadow-lg my-12 mx-8">
                        <img className="w-full h-48" src={`${project.mainPhoto}`} alt="" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{project.title}</div>
                            <p className="text-grey-darker text-base">{project.intro}</p>
                            <p className="text-grey-darker text-base pt-4">{truncatedText}</p>
                        </div>
                        <div className="px-6 py-4">
                            <Link
                            href={`/projects/${project._id}`}>
                                <button className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 transition duration-300 ease-in-out mr-6" >Read More</button>
                            </Link>
                        </div>
                    </div>
                )

    
}

export default ProjectCard;