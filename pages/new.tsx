import Link from 'next/link'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import BaseLayout from '../components/layouts/BaseLayout'
import Upload from '../components/shared/Upload'
import { useGetUser } from '../actions/user'


const NewArticle = (props: Props) => {

    const [form, setForm] = useState({
            title: '', 
            intro: '', 
            description: '', 
            body1: '', 
            body2: '', 
            body3: '', 
            body4: '', 
            body5: '', 
            mainPhoto: '',
            photo2: '',
            photo3: '',
            photo4: '',
            photo5: '',
            linkUrl: '',
            linkDescription: '',

        });

        const [isSubmitting, setIsSubmitting] = useState(false);
        const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isSubmitting) {
            debugger
            if (Object.keys(errors).length === 0) {
                createArticle();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

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

    let router = useRouter();
    const createArticle = () => {
        debugger
        axios.post('http://localhost:3000/api/articles', {
            title: form.title,
            intro: form.intro,
            description: form.description,
            mainPhoto: form.mainPhoto,
            body1: form.body1,
            body2: form.body2,
            body3: form.body3,
            body4: form.body4,
            body5: form.body5,
            photo2: form.photo2,
            photo3: form.photo3,
            photo4: form.photo4,
            photo5: form.photo5,
            linkUrl: form.linkUrl,
            linkDescription: form.linkDescription
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        router.push('/');    
    }

    const handleChange = (e) => {
        //debugger
        setForm({
            ...form,
            [e.target.name]: e.target.value 
        })
        
    };

    const handleFileUpload = (key, value) => {
        setForm({
            ...form,
            [key]: value 
        })
        debugger
        
    }
        const { loading, data } = useGetUser();
        return (
            <BaseLayout data={data} loading={loading} >
                <div className="form-container">
                    <h1>Create New Article for Your Portfolio</h1>

                    <div className="new-form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                                <input type="text" placeholder="Grab their attention!" name="title" onChange={handleChange} />
                            <label htmlFor="intro">Introduction</label>
                                <textarea placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro" onChange={handleChange} />
                            <label htmlFor="description">Description</label>
                                <textarea placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description" onChange={handleChange} />
                            <label htmlFor="linkUrl">Source Link</label>
                                <input type="text" placeholder="Paste the URL of the original article" name="linkUrl" onChange={handleChange} />
                            <label htmlFor="linkUrl">Link Text</label>
                                <input type="text" placeholder="How do you want the link text to appear?" name="linkDescription" onChange={handleChange} />
                            <label htmlFor="body1">First Paragraph</label>
                                <textarea placeholder="First Paragraph" name="body1" onChange={handleChange} />
                            <Upload name={"mainPhoto"} sendPhotoString={handleFileUpload} title={"Main Photo"}/>

                            <label htmlFor="body1">Second Paragraph</label>
                                <textarea placeholder="Second Paragraph" name="body2" onChange={handleChange} />
                            <Upload name={"photo2"} sendPhotoString={handleFileUpload} title={"Second Photo"}/>
                            
                            <label htmlFor="body1">Third Paragraph</label>
                                <textarea placeholder="Third Paragraph" name="body3" onChange={handleChange} />
                            <Upload name={"photo3"} sendPhotoString={handleFileUpload} title={"Third Photo"}/>
                            
                            <label htmlFor="body1">Fourth Paragraph</label>
                                <textarea placeholder="Fourth Paragraph" name="body4" onChange={handleChange} />
                            <Upload name={"photo4"} sendPhotoString={handleFileUpload} title={"Fourth Photo"}/>
                            
                            <label htmlFor="body1">Fifth Paragraph</label>
                                <textarea placeholder="Fifth Paragraph" name="body5" onChange={handleChange} />
                            <Upload name={"photo5"} sendPhotoString={handleFileUpload} title={"Fifth Photo"}/>
                            
                            <button>Post</button>
                        </form>
    
                    </div>
                </div>
            </BaseLayout>
        )
    

}

export default NewArticle;