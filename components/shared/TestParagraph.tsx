import React, { useState } from 'react'

export default function TestParagraph(props) {


        return (
            <div className="">
                <p>Write something for Paragraph Number {`${props.number}`}</p>
                <textarea className="w-72 h-72 p-3 my-3" placeholder={`Body Paragraph No. ${props.number}`} name="body3" />
            </div>
        );
    

}