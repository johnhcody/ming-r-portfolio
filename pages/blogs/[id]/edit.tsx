import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import BaseLayout from '../../../components/layouts/BaseLayout'
import { useGetUser } from '../../../actions/user'
import  Upload  from '../../../components/shared/Upload'
import { Footer } from '../../../components/shared/Footer'
import TestUpload from '../../../components/shared/TestUpload'
import TestParagraph from '../../../components/shared/TestParagraph'

const EditBlog = ({ blog }) => {
    const [form, setForm] = useState({
        title: blog.title, 
        intro: blog.intro, 
        description: blog.description,  
        mainPhoto: blog.mainPhoto,
        linkUrl: blog.linkUrl,
        linkDescription: blog.linkDescription,
        paragraphs: blog.paragraphs,
        photos: blog.photos
    });

    const [ paragraphsArr, setParagraphsArr ] = useState([]);
    const [ photoStrArr, setPhotoStrArr ] = useState([]);
    const { loading, data } = useGetUser();
    const [ errors, setErrors ] = useState({});
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ paraCount, setParaCount ] = useState(1);
    const [ photoCount, setPhotoCount ] = useState(1);
    const [ order, setOrder ] = useState(blog.order);
    const [ ready, setReady ] = useState(true);

    const router = useRouter();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const validate = () => {
        let err = {};

        if (!form.title) {
            err['title'] = "Title is required";
        }
        return err;
    }

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateBlog();
            } else {
                setIsSubmitting(false);
            }
        } else if (ready) {
            editInput();
        }
    }, [errors])

    const handleTextInput = (index, text) => {
        let newArr = [...paragraphsArr];
        newArr[index] = text;
        setParagraphsArr(newArr);
        setForm({
            ...form,
            paragraphs: newArr
        })  
    }

    const updateBlog = () => {

        axios.put(`/api/blogs/${router.query.id}`, {
            title: form.title,
            intro: form.intro,
            description: form.description,
            mainPhoto: form.mainPhoto,
            linkUrl: form.linkUrl,
            linkDescription: form.linkDescription,
            paragraphs: paragraphsArr,
            photos: photoStrArr
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        router.push('/');
    }

    const handleFileUpload = (index, value) => {
        let newArr = [...photoStrArr];
        newArr[index] = value;
        setPhotoStrArr(newArr);
        setForm({
            ...form,
            photos: newArr
        })
        
    }

    const editInput = () => {
        const newArr = [...blog.order]
        debugger
        // for (let i = 0; i < newArr.length; i++) {
        //     if (newArr[i] == 'photo') {
                
        //         setPhotoCount(prevState => prevState + 1);
        //         let newPhotoInput = `phot-${photoCount}`;
        //         let photoOrderCopy = order.slice();
        //         photoOrderCopy[i] = newPhotoInput;
        //         setOrder(photoOrderCopy)
        //         debugger
        //     } else if (newArr[i] = 'paragraph') {
        //         let newParaCount = paraCount + 1;
        //         setParaCount(newParaCount) 
        //         let newParaInput = `para-${newParaCount}`;
        //         let orderCopy = order.slice();
        //         orderCopy[i] = newParaInput
        //         setOrder(orderCopy)
        //         debugger
        //     }
        // }

        for (let i = 0; i < order.length; i++) {
            let phCount = 1;
            let paCount = 1;
            debugger
            if (order[i] == 'photo') {
                let newOrder = [...order]
                newOrder[i] = 'phot-' + phCount;
                setOrder(newOrder)
                phCount += 1;
                debugger
            } else if (order[i] = 'paragraph') {
                let newOrder = [...order]
                newOrder[i] = 'para-' + paCount;
                setOrder(newOrder)
                paCount += 1;
                debugger
            }
        }
        setReady(false);
        // newArr.map((el,idx) => {
        //     if (el == 'photo') {
        //         debugger
        //         setPhotoCount(photoCount + 1)
        //         let newInput = `phot-${photoCount}`;
        //         setOrder(order.concat(newInput))
        //     } else if (el == 'paragraph') {
        //         debugger
        //         setParaCount(paraCount + 1) 
        //         let newInput = `phot-${paraCount}`;
        //         setOrder(order.concat(newInput))
        //     }
        // })
        debugger
    }

    return (
        <>
        <BaseLayout data={data} loading={loading}>
            <div className="flex w-full justify-center">
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <h1 className="text-4xl">Edit your Blog Post</h1>
                    <label className="text-2xl pt-4 pb-2" htmlFor="title">Title</label>
                        <input type="text" onChange={handleChange} value={form.title} className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Grab their attention!" name="title"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="intro">Introduction</label>
                        <textarea onChange={handleChange} value={form.intro} className="w-72 h-24 p-3 my-3" placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="description">Description</label>
                        <textarea onChange={handleChange} value={form.description} className="w-72 h-72 p-3 my-3" placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="linkUrl">Source Link</label>
                        <input onChange={handleChange} value={form.linkUrl} className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0" type="text" placeholder="Paste the URL of the original article" name="linkUrl"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="linkDescription">Link Text</label>
                        <input onChange={handleChange} value={form.linkDescription} className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" type="text" placeholder="How do you want the link text to appear?" name="linkDescription"  />
                        {order.map((el, idx) => {
                    

                    // let word = ipt == "photo"
                    // as you map through the order, create a variable that matches what the TestUpload and TestParagraph are looking for, and then use state to keep track of the number (will be use later to index into the array)
                    //useState to add to paraCount and photoCount, then display the correct text/photo from that index
                    if (el.slice(0,4) == 'phot') {
                        //setPhotoCount(photoCount + 1)
                        return <TestUpload key={idx} number={el} concatPhotoStr={handleFileUpload}/>
                    } else if (el == 'para'){
                        //setPhotoCount(paraCount + 1)
                        return <TestParagraph key={idx} number={el} addText={handleTextInput}/>
                    }
                    })}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-full" >Save Changes</button>
                </form>

            </div>
        </BaseLayout>
        <Footer />
        </>
    )

}

EditBlog.getInitialProps = async ({ query: { id } }) => {
    const res = await axios.get(`/api/blogs/${id}`)
    const blog = res.data['data'];
    return { blog: blog }
}

export default EditBlog;