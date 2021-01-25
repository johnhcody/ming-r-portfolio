import Link from 'next/link'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import BaseLayout from '../components/layouts/BaseLayout'
import Upload from '../components/shared/Upload'
import { useGetUser } from '../actions/user'
import MultipleUpload from '../components/shared/MultipleUpload'
import { usePhoto, usePhotoUpdate } from '../context/photoContext'

class NewArticle extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
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
            isSubmitting: false,
            errors: {}
        }
    }


    // const photo = usePhoto();
    // const updatePhoto = usePhotoUpdate();

    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [errors, setErrors] = useState({});
    
    // const { loading, data } = useGetUser();

    // useEffect(() => {
    //     if (isSubmitting) {
    //         debugger
    //         if (Object.keys(errors).length === 0) {
    //             createArticle();
    //         } else {
    //             setIsSubmitting(false);
    //         }
    //     }
    // }, [errors])

    handleSubmit = (e) => {
        e.preventDefault();
        // let errs = this.validate();
        // setErrors(errs);
        const awsLink = document.getElementById('aws-link')
        debugger
        if (awsLink) {
            this.handleFileUpload();
            debugger
        }
        this.setState({isSubmitting: true});
    };

    // validate = () => {
    //     let err = {};

    //     if (!form.title) {
    //         err['title'] = "Title is required";
    //     }

    //     return err;
    // }

    createArticle = () => {
        debugger
        let router = useRouter();
        axios.post('http://localhost:3000/api/articles', {
            title: form.title,
            intro: form.intro,
            description: form.description,
            mainPhoto: form.mainPhoto,
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

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
       
    };

    handleFileUpload = () => {
        // const awsLink = document.getElementById('aws-link')

        // if (awsLink) {
        //     setForm({
        //         ...form,
        //         mainPhoto: awsLink.innerText
        //     });
        // } else {
        //     setForm({
        //         ...form,
        //         mainPhoto: 'https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/Mingkwan-Alt.png'
        //     });
        // }
        
    }

    render () {
        return (
            <BaseLayout data={data} loading={loading}>
                <div className="form-container">
                    <h1>Create New Article for Your Portfolio</h1>
                            <Upload />
                            {/* <MultipleUpload /> */}
                    <div className="new-form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                            <input type="text" placeholder="Grab their attention!" name="title" onChange={this.handleChange} />
                            <label htmlFor="intro">Introduction</label>
                            <textarea placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro" onChange={this.handleChange} />
                            <label htmlFor="description">Description</label>
                            <textarea placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description" onChange={this.handleChange} />
                            <label htmlFor="link">Source Link</label>
                            <label htmlFor="body1">First Paragraph</label>
                            <textarea placeholder="First Paragraph" name="body1" onChange={this.handleChange} />
                            <label htmlFor="body1">Second Paragraph</label>
                            <textarea placeholder="Second Paragraph" name="body2" onChange={this.handleChange} />
                            <label htmlFor="body1">Third Paragraph</label>
                            <textarea placeholder="Third Paragraph" name="body3" onChange={this.handleChange} />
                            <label htmlFor="body1">Fourth Paragraph</label>
                            <textarea placeholder="Fourth Paragraph" name="body4" onChange={this.handleChange} />
                            <label htmlFor="body1">Fifth Paragraph</label>
                            <textarea placeholder="Fifth Paragraph" name="body5" onChange={this.handleChange} />
                            <input type="text" placeholder="Paste the URL of the original article" name="linkUrl" onChange={this.handleChange} />
                            <input type="text" placeholder="How do you want the link text to appear?" name="linkDescription" onChange={this.handleChange} />
                            <button>Post</button>
                        </form>
    
                    </div>
                </div>
            </BaseLayout>
        )
    }
}

export default NewArticle;