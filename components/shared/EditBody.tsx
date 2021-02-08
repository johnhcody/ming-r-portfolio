import React, { useState } from 'react';
import EditPhoto from './EditPhoto'
import EditParagraph from './EditPargraph'

interface Props {
    bodyOrder: string[];
    bodyParagraphs: string[];
    bodyPhotos: string[];
    sendInput: Function;
    handleFileUpload: Function;
}

const EditBody: React.FC<Props> = ({ bodyOrder, bodyParagraphs, bodyPhotos, sendInput, handleFileUpload }) => {
    const photosArr = bodyPhotos.slice();
    const paragraphsArr = bodyParagraphs.slice();

    const body = bodyOrder.map((el, i) => {
        if (el == 'photo') {
            const nextPhoto: string = photosArr.shift()  
            return <EditPhoto key={i} source={`${nextPhoto}`} photoNumber={"photo-" + (bodyPhotos.indexOf(nextPhoto) + 1)} editPhotoArr={handleFileUpload} />
        } else {
            const nextParagraph = paragraphsArr.shift()
            const index: number = bodyParagraphs.indexOf(nextParagraph)
            return <EditParagraph sendInput={sendInput} value={nextParagraph} key={i} idx={index}/>
        }
    })

    return (
        <div className="flex justify-center flex-col items-center w-full pb-12" >{body}</div>
        )

}

export default EditBody;