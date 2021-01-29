import React, { useState, useEffect } from 'react'

export default function TestParagraph({ addText, number }) {

    const [ text, setText ] = useState('');

    useEffect(() => {
        debugger
        addText(index, text)
    }, [text])

    const handleChange = (e) => {
        setText(text => text = e.target.value);
    }

    const num = number.split('-')[1];
    const index = parseInt(num) - 1;
        return (
            <div className="">
                <p>Write something for Paragraph Number {`${num}`}</p>
                <textarea className="w-72 h-72 p-3 my-3" placeholder={`Body Paragraph No. ${num}`} name="body3" onChange={handleChange}/>
            </div>
        );
    

}