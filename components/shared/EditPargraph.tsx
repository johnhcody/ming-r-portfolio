import React, { useState } from 'react'

interface Props {
    sendInput: any;
    value: string;
    idx: number;
}

const EditParagraph:React.FC<Props> = props => {

    const handleChange = (e) => {
        debugger
        props.sendInput(props.idx, e.target.value)
    }
    
    return (
        <div className="flex w-full">
            <textarea className="w-full h-60 p-3 my-3 border-2 border-gray-200 rounded-md" value={props.value} onChange={handleChange}></textarea>
        </div>
    )

}

export default EditParagraph;