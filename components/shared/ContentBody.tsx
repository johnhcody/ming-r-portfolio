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
            return <img className="object-contain h-48 md:h-72 my-4 lg:h-96 w-full" key={idx} src={`${bodyPhotos.shift()}`} alt=""/>
        } else {
            return <p className="text-lg max-w-4/5 py-4" key={idx} >{bodyParagraphs.shift()}</p>
        }
    })

    return (
        <div className="flex justify-center flex-col items-center" >{contentBody}</div>
    )
}


export default BlogBody;