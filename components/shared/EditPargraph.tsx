import React, { useState } from 'react'

interface Props {
    sendInput: any;
    value: string;
    idx: number;
}

const EditParagraph = (props: Props) => {

    const handleChange = (e) => {
        props.sendInput(props.idx, e.target.value)
    }
    
    return (
        <div className="flex w-full">
            <textarea className="w-full h-72 p-3 my-3" value={props.value} onChange={handleChange}></textarea>
        </div>
    )

}

export default EditParagraph;