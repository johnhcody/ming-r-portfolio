import React, { useState } from 'react'

interface Props {
    sendType: Function;
}


const Dropdown: React.FC<Props> = ({ sendType }) => {

    const [open, setOpen ] = useState(false)

    const handleType = projectType => {
        sendType(projectType)
    }


    return (
        <div className="p-10">
        <div className="dropdown inline-block relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}  >
            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center" onClick={e => e.preventDefault()} >
            <span className="font-sans mr-1">Select Project Type</span>
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
            </button>
            {open ? <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li className=""><a className="font-sans rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={() => handleType('Article')}>Article</a></li>
                <li className=""><a className="font-sans bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={() => handleType('Blog')}>Blog</a></li>
                <li className=""><a className="font-sans rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={() => handleType('Project')}>Project</a></li>
                </ul> : null }
                
        </div>

    </div>
    )
}

export default Dropdown;