import React, { useState } from 'react';
import EditPhoto from '../../components/shared/EditPhoto'
import EditParagraph from '../../components/shared/EditPargraph'

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
            const nextPhoto = photosArr.shift()  
            return <EditPhoto key={i} source={`${nextPhoto}`} photoNumber={"photo-" + (bodyPhotos.indexOf(nextPhoto) + 1)} editPhotoArr={handleFileUpload} />
        } else {
            const nextParagraph = paragraphsArr.shift()
            const index = bodyParagraphs.indexOf(nextParagraph)
            return <EditParagraph sendInput={sendInput} value={nextParagraph} key={i} idx={index}/>
        }
    })

    return (
        <div className="flex justify-center flex-col items-center w-full" >{body}</div>
        )

}

export default EditBody;