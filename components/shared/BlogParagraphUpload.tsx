import React, { useState, useEffect } from 'react'

interface Props {
    addText: Function;
    paragraphNumber: string;
}

const BlogParagraphUpload: React.FC<Props> = ({ addText, paragraphNumber })=> {

    const [ text, setText ] = useState('');

    useEffect(() => {
        addText(index, text)
    }, [text])

    const handleChange = (e) => {
        setText(text => text = e.target.value);
    }

    const num = paragraphNumber.split('-')[1];
    const index = parseInt(num) - 1;
        return (
            <div className="w-full flex flex-col items-center">
                <p className="flex">Write something for Paragraph Number {`${num}`}</p>
                <textarea className=" w-full h-72 p-3 my-3" placeholder={`Body Paragraph No. ${num}`} name="body3" onChange={handleChange}/>
            </div>
        );
}

export default BlogParagraphUpload;