import React, { useState } from 'react'


interface Props {
    body: {
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

const BlogBody: React.FC<Props> = ({ body }) => {
    
    const [ order, setOrder ] = useState(body.order)

    const bodyPhotos = body.photos.slice();
    const bodyParagraphs = body.paragraphs.slice();

    const contentBody = order.map((el, idx) => {
        if (el == 'photo') {
            return <img className="py-4 max-h-full" key={idx} src={`${bodyPhotos.shift()}`} alt=""/>
        } else {
            return <p className="max-w-4/5 py-4" key={idx} >{bodyParagraphs.shift()}</p>
        }
    })

    return (
        <div className="flex justify-center flex-col items-center" >{contentBody}</div>
    )
}


export default BlogBody;