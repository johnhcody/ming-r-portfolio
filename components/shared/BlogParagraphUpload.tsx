import React, { useState, useEffect } from 'react'

interface Props {
    addText: Function;
    paragraphNumber: string;
    deleteElement: Function;
    inputIndex: number;
}

const BlogParagraphUpload: React.FC<Props> = ({ inputIndex, deleteElement, addText, paragraphNumber })=> {

    const [ text, setText ] = useState('');

    useEffect(() => {
        addText(index, text)
    }, [text])

    const handleChange = (e) => {
        setText(text => text = e.target.value);
    }

    const handleDelete = () => {
        deleteElement(inputIndex, index)
    }

    const num = paragraphNumber.split('-')[1];
    const index = parseInt(num) - 1;
        return (
            <div className="w-full flex flex-col items-center">
                <p className="flex">Write something for Paragraph Number {`${num}`}</p>
                <textarea className="border-2 rounded-md text-center w-full h-72 p-3 my-3" placeholder={`Body Paragraph No. ${num}`} name="body3" onChange={handleChange}/>
                {/* <button onClick={handleDelete} className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full outline:none" >Delete Paragraph</button> */}
            </div>
        );
}

export default BlogParagraphUpload;