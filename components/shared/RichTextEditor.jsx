import React from 'react';
import { useState } from 'react';
//import ReactQuill from 'react-quill';

// interface Props {
//   placeholder: string;
//   sendText: Function;
//   editedText: string;
//   inputIndex: number;
//   paragraphNumber: string;
//   deleteElement: Function;
// }

class RichTextEditor extends React.Component {

    constructor(props) {
        super(props)
        if (typeof window !== 'undefined') {
          this.ReactQuill = require('react-quill')
        }
        this.state = {
            editorHTML: this.props.editedText,
            paraIndex: 0        }
      }

      
      
      //const [ editorHTML, setEditorHTML ] = useState(editedText);
      
      handleChange = (html) => {
          // this.props.setEditorHTML(editorHTML => editorHTML = html)
          this.setState({editorHTML: html})
          this.props.sendText(this.state.paraIndex, html)
        }
        
        handleDelete = () => {
            this.props.deleteElement(this.props.inputIndex, this.state.paraIndex, editorHTML)
        }

        componentDidMount = () => {
            const num = this.props.paragraphNumber.split('-')[1];
            const paraIdx = parseInt(num) - 1;
            this.setState({paraIndex: paraIdx})
        }
        
        render() {
        const { sendText, inputIndex, paragraphNumber, deleteElement, placeholder, editorText } = this.props;
        const ReactQuill = this.ReactQuill;
        if (typeof window !== 'undefined' && ReactQuill) {

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
                onChange={this.handleChange}
                value={this.state.editorHTML || ''}
                modules={modules}
                formats={formats}
            />
            <div className="h-24"></div>
            </>
        )
    } else {
        return (
            <>
            <div className="h-8"></div>
                <textarea value={editedText}></textarea>
            <div className="h-24"></div>
            </>
        )
    }



    //proper end of render()   
    }



//     if (typeof window !== 'undefined') {
//         return (
//             <>
//             <div className="h-8"></div>
//             <ReactQuill 
//                 onChange={handleChange}
//                 value={editorHTML}
//                 modules={modules}
//                 formats={formats}
//             />
//             <div className="h-24"></div>
//             </>
//         )
//     } else {
//         return (
//         <>
//         <div className="h-8"></div>
//             <textarea value={editedText}></textarea>
//             <div className="h-24"></div>
//             {/* <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full outline:none mt" type="submit" onClick={handleDelete} > Delete Paragraph</button> */}

//             </>
//         )
//     }
  
 };

export default RichTextEditor;