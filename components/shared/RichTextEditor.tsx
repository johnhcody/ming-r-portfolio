import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';

interface Props {
  placeholder: string;
  sendText: Function;
}

const RichTextEditor: React.FC<Props> = ({ sendText, placeholder }) => {


    const [ editorHTML, setEditorHTML ] = useState('');

    const handleChange = (html) => {
        setEditorHTML(editorHTML => editorHTML = html)
        sendText(html)
    }


    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
          ],
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    return (
        <ReactQuill 
            onChange={handleChange}
            value={editorHTML}
            modules={modules}
            formats={formats}
        />
    )
  
};

export default RichTextEditor;