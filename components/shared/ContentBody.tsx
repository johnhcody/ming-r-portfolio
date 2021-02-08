// import React, { useState } from 'react'
// import ReactQuill from 'react-quill';

// interface Props {
//     body: {
//         title: string;
//         intro: string;
//         description: string;
//         paragraphs: string[];
//         photos: string[];
//         order: string[];
//         linkUrl: string;
//         linkDescription: string;
//         mainPhoto: string;
//         _id: string;
//         text: string;
//     }
// }

// const BlogBody: React.FC<Props> = ({ body }) => {
    
//     const [ order, setOrder ] = useState(body.order)

//     const bodyPhotos = body.photos.slice();
//     const bodyParagraphs = body.paragraphs.slice();

//     // const contentBody = order.map((el, idx) => {
//     //     if (el == 'photo') {
//     //         return <img className="object-contain h-48 md:h-72 my-4 lg:h-96 w-full" key={idx} src={`${bodyPhotos.shift()}`} alt=""/>
//     //     } else {
//     //         return <p className="leading-normal text-lg max-w-4/5 py-4" key={idx} >{bodyParagraphs.shift()}</p>
//     //     }
//     // })

//     // return (
//     //     <div className="flex justify-center flex-col items-center" >{contentBody}</div>
//     // )

//     // if (typeof document == 'undefined') {
//     //     return null
//     // } else {
//     //     return (
//     //     <ReactQuill value={body || ''}
//     //         readOnly={true}/>
//     // )
//     // }
// }


// export default BlogBody;

import React, {Component} from 'react'

export default class ContentBody extends Component {
  constructor(props) {
    super(props)
    if (document) {
      this.quill = require('react-quill')
    }
    this.state = {order: this.props.body.order}
  }

  render() {
      debugger
    const Quill = this.quill
    const bodyPhotos = this.props.body.photos.slice();
    const bodyParagraphs = this.props.body.paragraphs.slice();
    if (Quill) {
      const contentBody = this.state.order.map((el, idx) => {
          if (el == 'photo') {
              return <img className="object-contain h-48 md:h-72 my-4 lg:h-96 w-full" key={idx} src={`${bodyPhotos.shift()}`} alt=""/>
          } else {
            return <Quill
                key={idx}
                theme="bubble"
                value={bodyParagraphs.shift()}
                readOnly={true}
              />
          }
      })
      return (
        <div className="">
          {contentBody}
        </div>
      )

    } else {
      return null
    }
  }
}