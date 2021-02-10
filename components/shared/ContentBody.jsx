import React, {Component} from 'react'

// interface Props {
//   body: {
//     title: string;
//     intro: string;
//     description: string;
//     paragraphs: string[];
//     photos: string[];
//     order: string[];
//     linkUrl: string;
//     linkDescription: string;
//     mainPhoto: string;
//     _id: string;
// }
// }

class ContentBody extends Component {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
  }


  render() {
    const ReactQuill = this.ReactQuill
    if (typeof window !== 'undefined' && ReactQuill) {
      const bodyPhotos = this.props.body.photos.slice();
      const bodyParagraphs = this.props.body.paragraphs.slice();

      const contentBody = this.props.body.order.map((el, idx) => {
        if (el == 'photo') {
            return <img className="object-contain h-48 md:h-72 my-4 lg:h-96 w-full" key={idx} src={`${bodyPhotos.shift()}`} alt=""/>
        } else {
          return (
          <div className="content-quill-wrapper">
  
            <ReactQuill
              key={idx}
              theme="bubble"
              value={bodyParagraphs.shift()}
              readOnly={true}
              />
          </div>
            )
        } 
      })

      return (
        <div className="flex flex-col items-center justify-center">
       {contentBody}
        </div>
      )
    } else {
      return <textarea />;
    }
  }

//   render() {
//     const ReactQuill = this.ReactQuill
//     if (typeof window !== 'undefined' && ReactQuill) {
//     const bodyPhotos = this.props.body.photos.slice();
//     const bodyParagraphs = this.props.body.paragraphs.slice();

//     const contentBody = this.props.body.order.map((el, idx) => {
//           if (el == 'photo') {
//               return <img className="object-contain h-48 md:h-72 my-4 lg:h-96 w-full" key={idx} src={`${bodyPhotos.shift()}`} alt=""/>
//           } else {
//             return (
//             <div className="content-quill-wrapper">
    
//               <Quill
//                 key={idx}
//                 theme="bubble"
//                 value={bodyParagraphs.shift()}
//                 readOnly={true}
//                 />
//             </div>
//         )
//     } 
//   })
//   return (
//     <div className="flex flex-col items-center justify-center">
//        {contentBody}
//    </div>
//   )
// } else {
//   return <textarea ></textarea>
// } 


  // if (typeof window !== 'undefined') {
  //   const Quill = require('react-quill')
  //   const bodyPhotos = body.photos.slice();
  //   const bodyParagraphs = body.paragraphs.slice();



  //   const contentBody = body.order.map((el, idx) => {
  //     if (el == 'photo') {
  //         return <img className="object-contain h-48 md:h-72 my-4 lg:h-96 w-full" key={idx} src={`${bodyPhotos.shift()}`} alt=""/>
  //     } else {
  //       return (
  //       <div className="content-quill-wrapper">

  //         <Quill
  //           key={idx}
  //           theme="bubble"
  //           value={bodyParagraphs.shift()}
  //           readOnly={true}
  //           />
  //       </div>
  //       )
  //     }
  //   })
  //   return (
  //     <div className="flex flex-col items-center justify-center">
  //       {contentBody}
  //     </div>
  //   )
  //   } else {
  //     return null;
  //   }
  }

export default ContentBody;

