import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import BaseLayout from '../../../components/layouts/BaseLayout'
import { useGetUser } from '../../../actions/user'
import  Upload  from '../../../components/shared/Upload'
import { Footer } from '../../../components/shared/Footer'


const EditBlog = ({ blog }) => {
    const [form, setForm] = useState({
        title: blog.title, 
        intro: blog.intro, 
        description: blog.description,  
        mainPhoto: blog.mainPhoto,
        linkUrl: blog.linkUrl,
        linkDescription: blog.linkDescription,
    });

    const { loading, data } = useGetUser();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        }
    }, [errors])


    const updateBlog = () => {

        axios.put(`/api/blogs/${router.query.id}`, {
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
                    {/* <span>Upload your Main Photo</span>
                    <Upload name={"mainPhoto"} sendPhotoString={handleMainPhoto} title={"Main Photo"} />
                    {input.map((ipt, idx) => {
                    let word = ipt.slice(0,5);
 
                    if (word == 'phot-') {
                        return <TestUpload key={idx} number={ipt} concatPhotoStr={handleFileUpload}/>
                    } else if (word == 'para-'){
                        return <TestParagraph key={idx} number={ipt} addText={handleTextInput}/>
                    }
                    })} */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-full" >Save Changes</button>
                </form>

            </div>
        </BaseLayout>
        <Footer />
        </>
    )

}

EditBlog.getInitialProps = async ({ query: { id } }) => {
    debugger
    const res = await axios.get(`/api/blogs/${id}`)
    const blog = res.data['data'];
    debugger
    return { blog: blog }
}

export default EditBlog;