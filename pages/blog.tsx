import React, { useState, useEffect } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { useGetUser } from '../actions/user'
import Upload from '../components/shared/Upload'
import TestUpload from '../components/shared/TestUpload'
import TestParagraph from '../components/shared/TestParagraph'
import { Footer } from '../components/shared/Footer'

interface Props {
    
}
interface State {
    
}

const Blog = (props: Props) => {
    const { loading, data } = useGetUser();
    const [ input, setInput ] = useState([]);
    const [ paraCount, setParaCount ] = useState(1);
    const [ paraNumber, setParaNumber ] = useState([]);
    const [ body, setBody ] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        
    }, [input])

    const appendPhoto = () => {

        let newInput = `photo-${input.length}`;
        setInput(input.concat(newInput));
        debugger
    }

    const appendParagraph = () => {
        setParaCount(paraCount + 1);
        setParaNumber(paraNumber.concat(paraCount))
        let newInput = `para-${paraCount}`;
        setInput(input.concat(newInput));
        setBody(body.concat([{}]))
    }
    debugger
    return (
        <>
        <BaseLayout data={data} loading={loading}>
            <div className="flex w-full justify-center">
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <h1>Create an Article</h1>
                    <label className="pt-4 pb-2"htmlFor="title">Title</label>
                        <input type="text" className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Grab their attention!" name="title"  />
                    <label htmlFor="intro">Introduction</label>
                        <textarea className="w-72 h-24 p-3 my-3" placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro"  />
                    <label htmlFor="description">Description</label>
                        <textarea className="w-72 h-72 p-3 my-3" placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description"  />
                    <label className="py-2" htmlFor="linkUrl">Source Link</label>
                        <input className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0" type="text" placeholder="Paste the URL of the original article" name="linkUrl"  />
                    <label className="py-2" htmlFor="linkUrl">Link Text</label>
                        <input className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" type="text" placeholder="How do you want the link text to appear?" name="linkDescription"  />
                    {input.map((ipt, idx) => {
                    let word = ipt.slice(0,5);
 
                    if (word == 'photo') {
                        return <TestUpload key={idx} />
                    } else if (word == 'para-'){
                        return <TestParagraph key={idx} number={ipt}/>
                    }
                    })}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-full" onClick={appendPhoto}>Add Photo</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-full outline:none" onClick={appendParagraph}>Add Paragraph</button>
                </form>

            </div>
        </BaseLayout>
        <Footer />
        </>
    )
    
}

export default Blog;
