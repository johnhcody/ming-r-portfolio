import React, { useState } from 'react'

export default function TestParagraph(props) {

    const number = props.number.split('-')[1]
        return (
            <div className="">
                <p>Write something for Paragraph Number {`${number}`}</p>
                <textarea className="w-72 h-72 p-3 my-3" placeholder={`Body Paragraph No. ${number}`} name="body3" />
            </div>
        );
    

}