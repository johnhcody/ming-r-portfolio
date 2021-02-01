import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import BaseLayout from '../../../components/layouts/BaseLayout'
import Article from '../../../models/Article'
import { useGetUser } from '../../../actions/user'
import  Upload  from '../../../components/shared/Upload'
import { Footer } from '../../../components/shared/Footer'

const EditArticle = ({ article }) => {
    //debugger
    const [form, setForm] = useState({
        title: article.title, 
        intro: article.intro, 
        description: article.description, 
        body1: article.body1, 
        body2: article.body2, 
        body3: article.body3, 
        body4: article.body4, 
        body5: article.body5, 
        mainPhoto: article.mainPhoto,
        photo2: article.photo2,
        photo3: article.photo3,
        photo4: article.photo4,
        photo5: article.photo5,
        linkUrl: article.linkUrl,
        linkDescription: article.linkDescription,

    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateArticle();
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

    const updateArticle = () => {

        axios.put(`/api/articles/${router.query.id}`, {
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
        <BaseLayout data={data} loading={loading}>
            <div className="form-container">
                <h1>Update your Article</h1>
                <div className="new-form-wrapper">
                <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title</label>
                                <input type="text" className="text-center" placeholder="Grab their attention!" name="title" value={form.title} onChange={handleChange} />
                            <label htmlFor="intro">Introduction</label>
                                <textarea className="text-center"  placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro" value={form.intro} onChange={handleChange} />
                            <label htmlFor="description">Description</label>
                                <textarea className="text-center"  placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description" value={form.description} onChange={handleChange} />
                            <label htmlFor="linkUrl">Source Link</label>
                                <input className="text-center" type="text" placeholder="Paste the URL of the original article" name="linkUrl" value={form.linkUrl} onChange={handleChange} />
                            <label htmlFor="linkUrl">Link Text</label>
                                <input className="text-center" type="text" placeholder="How do you want the link text to appear?" name="linkDescription" value={form.linkDescription} onChange={handleChange} />
                            <label htmlFor="body1">First Paragraph</label>
                                <textarea className="text-center"  placeholder="First Paragraph" name="body1" value={form.body1} onChange={handleChange} />
                                    <img className="w-auto h-48" src={`${form.mainPhoto}`} alt=""/>
                                        <Upload name={"mainPhoto"} sendPhotoString={handleFileUpload} title={"Changing the Main Photo"}/>

                            <label htmlFor="body1">Second Paragraph</label>
                                <textarea placeholder="Second Paragraph" name="body2" value={form.body2} onChange={handleChange} />
                                    <img className="w-auto h-48" src={`${form.photo2}`} alt=""/>
                                        <Upload name={"photo2"} sendPhotoString={handleFileUpload} title={"Changing the Second Photo"}/>
                            
                            <label htmlFor="body1">Third Paragraph</label>
                                <textarea className="text-center" placeholder="Third Paragraph" name="body3" value={form.body3} onChange={handleChange} />
                                    <img className="w-auto h-48" src={`${form.photo3}`} alt=""/>
                                        <Upload name={"photo3"} sendPhotoString={handleFileUpload} title={"Changing the Third Photo"}/>
                            
                            <label htmlFor="body1">Fourth Paragraph</label>
                                <textarea className="text-center"  placeholder="Fourth Paragraph" name="body4" value={form.body4} onChange={handleChange} />
                                <img className="w-auto h-48" src={`${form.photo4}`} alt=""/>
                                    <Upload name={"photo4"} sendPhotoString={handleFileUpload} title={"Changing the Fourth Photo"}/>
                            
                            <label htmlFor="body1">Fifth Paragraph</label>
                                <textarea className="text-center"  placeholder="Fifth Paragraph" name="body5" value={form.body5} onChange={handleChange} />
                                    <img className="w-auto h-48" src={`${form.photo5}`} alt=""/>
                                        <Upload name={"photo5"} sendPhotoString={handleFileUpload} title={"Changing the Fifth Photo"}/>
                            
                            <button>Save Changes</button>
                        </form>
                </div>
            </div>
            <Footer />
        </BaseLayout>
    )
}

EditArticle.getInitialProps = async ({ query: { id } }) => {
    debugger
    const res = await axios.get(`/api/articles/${id}`)
    const article = res.data['data'];
    debugger
    return { article: article }
}


export default EditArticle;