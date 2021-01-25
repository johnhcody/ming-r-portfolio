import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import BaseLayout from '../../components/layouts/BaseLayout'
import Article from '../../models/Article'
import { useGetUser } from '../../actions/user'

const EditArticle = ({ article }) => {
    debugger
    const [form, setForm] = useState({ title: article.title, intro: article.intro, description: article.description, img: article.img, link: article.link });
    // const [form, setForm] = useState({ title: '', intro: '', img: '', link: '' });

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

        axios.put(`http://localhost:3000/api/articles/${router.query.id}`, {
            title: form.title,
            intro: form.intro,
            img: form.img,
            link: form.link
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

    const { loading, data } = useGetUser();

    return (
        <BaseLayout data={data} loading={loading}>
            <div className="form-container">
                <h1>Update your Article</h1>
                <div className="new-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Title</label>
                            <input type="text" placeholder="Title" name="title" value={form.title} onChange={handleChange} />
                        <label htmlFor="intro">intro</label>
                            <input type="text" placeholder="intro" name="intro" value={form.intro} onChange={handleChange} />
                        <label htmlFor="image">image</label>
                            <input type="text" placeholder="image" name="image" value={form.img} onChange={handleChange} />
                        <label htmlFor="description">description</label>
                            <textarea placeholder="update your description" name="description" value={form.description} onChange={handleChange} />
                        <label htmlFor="link">link</label>
                            <input type="text" placeholder="link" name="link" value={form.link} onChange={handleChange} />
                        <button>Update</button>
                    </form>
                </div>
            </div>
        </BaseLayout>
    )
}

EditArticle.getInitialProps = async ({ query: { id } }) => {
    debugger
    const res = await axios.get(`http://localhost:3000/api/articles/${id}`)
    const article = res.data['data'];
    debugger
    return { article: article }
}


export default EditArticle;