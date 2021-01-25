import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import BaseLayout from '../components/layouts/BaseLayout'
import Upload from '../components/shared/Upload'
import { useGetUser } from '../actions/user'


const NewArticle = () => {
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
        linkDescription: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const { loading, data } = useGetUser();

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
        const awsLink = document.getElementById('aws-link')
        if (awsLink) {
            handleFileUpload();
            debugger
        }
        setIsSubmitting(true);
    };

    const validate = () => {
        let err = {};

        if (!form.title) {
            err['title'] = "Title is required";
        }

        return err;
    }

    const createArticle = () => {

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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value 
        })
        
    };

    const handleFileUpload = () => {
        const awsLink = document.getElementById('aws-link')

        if (awsLink) {
            setForm({
                ...form,
                mainPhoto: awsLink.innerText
            });
        } else {
            setForm({
                ...form,
                mainPhoto: 'https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/Mingkwan-Alt.png'
            });
        }
        
    }


    return (
        <BaseLayout data={data} loading={loading}>
            <div className="form-container">
                <h1>Create New Article for Your Portfolio</h1>
                        <Upload />
                <div className="new-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Title</label>
                        <input type="text" placeholder="Grab their attention!" name="title" onChange={handleChange} />
                        <label htmlFor="intro">Introduction</label>
                        <textarea placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro" onChange={handleChange} />
                        <label htmlFor="description">Description</label>
                        <textarea placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description" onChange={handleChange} />
                        <label htmlFor="link">Source Link</label>
                        <input type="text" placeholder="Paste the URL of the original article" name="linkUrl" onChange={handleChange} />
                        <input type="text" placeholder="How do you want the link text to appear?" name="linkDescription" onChange={handleChange} />
                        <button>Post</button>
                    </form>
                </div>
            </div>
        </BaseLayout>
    )
}

export default NewArticle;