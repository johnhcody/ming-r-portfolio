import React, { useState, useEffect } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { useGetUser } from '../actions/user'
import { useRouter } from 'next/router'
import BlogPhotoUpload from '../components/shared/BlogPhotoUpload'
import BlogParagraphUpload from '../components/shared/BlogParagraphUpload'
import Footer from '../components/shared/Footer'
import axios from 'axios'
import Upload from '../components/shared/Upload'
import Dropdown from '../components/shared/Dropdown'

interface Props {
    
}

const CreateNew:React.FC = props => {
    const { loading, data } = useGetUser();
    const [ input, setInput ] = useState([]);
    const [ photoStrArr, setPhotoStrArr ] = useState([])
    const [ paraCount, setParaCount ] = useState(1);
    const [ photoCount, setPhotoCount ] = useState(1);
    const [ paragraphsArr, setParagraphsArr ] = useState([])
    const [ order, setOrder ] = useState([]);
    const [ isSubmitting, setIsSubmitting] = useState(false);
    const [ errors, setErrors] = useState({});
    const [ type, setType ] = useState('');

    const [form, setForm] = useState({
        title: '', 
        intro: '', 
        type: '',
        description: '', 
        paragraphs: [],
        mainPhoto: '',
        photos: [],
        linkUrl: '',
        linkDescription: ''
    })
    
    useEffect(() => {
        if (isSubmitting) {
             
            if (Object.keys(errors).length === 0) {
                createBlog();
            } else {
                console.log(errors)
                setIsSubmitting(false);
            }
        }
    }, [errors])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
         
    }

    const validate = () => {    
        let err = {};

        if (!form.title) {
            err['title'] = "Title is required";
        } else if (!form.type) {
            err['type'] = "Please select a project type";
        }

        return err;
    }

    let router = useRouter();
    const createBlog = () => {
         
        axios.post('/api/blogs', {
            title: form.title,
            intro: form.intro,
            type: form.type,
            description: form.description,
            paragraphs: paragraphsArr,
            photos: photoStrArr,
            order: order,
            linkUrl: form.linkUrl,
            linkDescription: form.linkDescription,
            mainPhoto: form.mainPhoto
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        router.push('/');    
    }


    const appendPhoto = () => {
        setPhotoCount(photoCount + 1);
        let newInput = `phot-${photoCount}`;
        setInput(input.concat(newInput));
        constructOrder('photo')
         
    }

    const appendParagraph = () => {
        setParaCount(paraCount + 1);
        let newInput = `para-${paraCount}`;
        setInput(input.concat(newInput));
        constructOrder('paragraph')
    }

    const constructOrder = (blockType) => {
        let newOrder = [...order]
        newOrder.push(blockType)
        setOrder(newOrder)
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

    const handleMainPhoto = (key, value) => {
        setForm({
            ...form,
            'mainPhoto': value
        })
    }

    const handleTextInput = (index, text) => {
        let newArr = [...paragraphsArr];
        newArr[index] = text;
        setParagraphsArr(newArr);
        setForm({
            ...form,
            paragraphs: newArr
        })  
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value 
        })
    };

    const postBlog = (e) => {
        setIsSubmitting(true);
    }

    const handleType = (projectType) => {
        debugger
        //setType(type => type = projectType);
        setForm({
            ...form,
            'type': projectType 
        })
    }


    return (
        <>
        <BaseLayout data={data} loading={loading}>
            <div className="flex w-full justify-center">
                <form className="flex flex-col items-center w-4/5" onSubmit={handleSubmit}>
                    <h1 className="text-4xl">Create a New Blog Post</h1>
                    <Dropdown sendType={handleType}/>
                    <label className="text-2xl pt-4 pb-2" htmlFor="title">{form.type} Title</label>
                        <input type="text" onChange={handleChange} className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Grab their attention!" name="title"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="intro">{form.type} Introduction</label>
                        <textarea onChange={handleChange} className="border-2 rounded-md text-center w-full h-24 p-3 my-3" placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="description">{form.type} Description</label>
                        <textarea onChange={handleChange} className="border-2 rounded-md text-center w-full h-72 p-3 my-3" placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description"  />
                        <label className="text-2xl pt-4 pb-2" htmlFor="linkUrl">{form.type} Link URL</label>
                    <input type="text" onChange={handleChange} className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Copy and Paste Link Address" name="linkUrl"  />
                        <label className="text-2xl pt-4 pb-2" htmlFor="linkDescription">{form.type} Link Description</label>
                    <input type="text" onChange={handleChange} className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Text that will appear on hyperlink" name="linkDescription"  />
                    <span className="text-2xl pt-4 pb-2" >Upload your Main Photo</span>
                    <Upload name={"mainPhoto"} sendPhotoString={handleMainPhoto} title={"Main Photo"} />
                    {input.map((ipt, idx) => {
                    let word = ipt.slice(0,5);
 
                    if (word == 'phot-') {
                        return <BlogPhotoUpload key={idx} photoNumber={ipt} sendPhotoStr={handleFileUpload}/>
                    } else if (word == 'para-'){
                        return <BlogParagraphUpload key={idx} paragraphNumber={ipt} addText={handleTextInput}/>
                    }
                    })}
                    <button className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full" onClick={appendPhoto}>Add Photo</button>    
                    <button className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full outline:none" onClick={appendParagraph}>Add Paragraph</button>
                    <button className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full outline:none" type="submit" onClick={postBlog} > Post Blog</button>
                    {errors.title ? <h1>{errors.title}</h1> : null}
                </form>
            </div>
        </BaseLayout>
        <Footer />
        </>
    )
    
}

export default CreateNew;