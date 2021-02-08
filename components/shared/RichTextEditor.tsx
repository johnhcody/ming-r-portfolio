import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';

interface Props {
  placeholder: string;
  sendText: Function;
  editedText: string;
  inputIndex: number;
  paragraphNumber: string;
}

const RichTextEditor: React.FC<Props> = ({ sendText, inputIndex, paragraphNumber, placeholder, editedText }) => {


    const [ editorHTML, setEditorHTML ] = useState(editedText);

    const handleChange = (html) => {
        setEditorHTML(editorHTML => editorHTML = html)
        sendText(index, html)
    }

    const num = paragraphNumber.split('-')[1];
    const index = parseInt(num) - 1;

    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean'],
            [{ 'align': [] }],
          ],
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'align',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    return (
      <>
      <div className="h-8"></div>
        <ReactQuill 
            onChange={handleChange}
            value={editorHTML}
            modules={modules}
            formats={formats}
        />
        <div className="h-24"></div>
        </>
    )
  
};

export default RichTextEditor;