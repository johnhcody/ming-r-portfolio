import React, { useState } from 'react'
import BlogPhotoUpload from '../../components/shared/BlogPhotoUpload'

interface Props {
    source: string;
    photoNumber: string;
    editPhotoArr: Function;

}

const EditPhoto: React.FC<Props> = props => {

    const [willUpload, setWillUpload] = useState(false);

    if (!willUpload) {
        return (
            <div className="flex flex-col items-center">
                <img className="object-contain h-48 md:h-72 my-4  w-full"  src={`${props.source}`} alt=""/>
                <button className="focus:outline-none font-sans focus:ring max-w-lg font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 transition duration-300 ease-in-out mr-6" onClick={() => setWillUpload(true)} >Replace Photo</button>
            </div>
    )
    } else {
        return (
            <div className="flex flex-col items-center">
                <img className="object-contain h-48 md:h-72 my-4 lg:h-96 w-full"  src={`${props.source}`} alt=""/>
                <BlogPhotoUpload photoNumber={props.photoNumber} sendPhotoStr={props.editPhotoArr}/>
            </div>
        )
    }
}

export default EditPhoto;