import React, { useState } from 'react'
import BlogPhotoUpload from '../../components/shared/BlogPhotoUpload'

interface Props {
    source: string;
    photos: number[];
    number: number;
    editPhotoArr: any;
}

const EditPhoto = (props: Props) => {

    const [willUpload, setWillUpload] = useState(false);

    if (!willUpload) {
        return (
            <div className="flex flex-col">
                <img className="h-auto w-auto py-4 max-w-max max-h-48"  src={`${props.source}`} alt=""/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-full" onClick={() => setWillUpload(true)} >Replace Photo</button>
            </div>
    )
    } else {
        debugger
        return (
            <div className="flex flex-col">
                <img className="h-72 w-auto py-4"  src={`${props.source}`} alt=""/>
                <BlogPhotoUpload number={props.number} sendPhotoStr={props.editPhotoArr} />
            </div>
        )
    }
}

export default EditPhoto;