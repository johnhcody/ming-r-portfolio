import React, { useState } from 'react';
import EditPhoto from './EditPhoto'
import EditParagraph from './EditPargraph'
import RichTextEditor from './RichTextEditor';

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
    const indexArr = new Array(bodyParagraphs.length)

    for (let i = 0; i < indexArr.length; i++) {
        indexArr[i] = `para-${i + 1}`
    }

    const body = bodyOrder.map((el, i) => {
        if (el == 'photo') {
            const nextPhoto: string = photosArr.shift()  
            return <EditPhoto key={i} source={`${nextPhoto}`} photoNumber={"photo-" + (bodyPhotos.indexOf(nextPhoto) + 1)} editPhotoArr={handleFileUpload} />
        } else {
            const nextParagraph = paragraphsArr.shift()
            const index: number = bodyParagraphs.indexOf(nextParagraph)
            return <RichTextEditor paragraphNumber={indexArr.shift()} placeholder={''} sendText={sendInput} editedText={nextParagraph} key={i} inputIndex={index} />
        }
    })

    return (
        <div className="flex justify-center flex-col items-center w-full pb-12" >{body}</div>
        )

}

export default EditBody;