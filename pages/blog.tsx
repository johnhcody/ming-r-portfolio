import React, { useState } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { useGetUser } from '../actions/user'
import Upload from '../components/shared/Upload'
import TestUpload from '../components/shared/TestUpload'

interface Props {
    
}
interface State {
    
}

const Blog = (props: Props) => {
    const { loading, data } = useGetUser();
    const [ input, setInput ] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const appendPhoto = () => {

        let newInput = `input-${input.length}`;
        setInput(input.concat(newInput));
    }

    const appendParagraph = () => {
        
    }

    return (
        <BaseLayout data={data} loading={loading}>
            
            <form onSubmit={handleSubmit}>
                <h1>Form</h1>
                {input.map(ipt => <TestUpload key={ipt} />)}
                <button onClick={appendPhoto}>Add Photo</button>
                <button onClick={appendParagraph}>Add Paragraph</button>
            </form>
        </BaseLayout>
    )
    
}

export default Blog;
