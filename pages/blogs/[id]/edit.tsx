import { useState, useEffect } from 'react'
import { NextPage } from 'next';
import axios from 'axios'
import { useRouter } from 'next/router'
import BaseLayout from '../../../components/layouts/BaseLayout'
import { useGetUser } from '../../../actions/user'
import Footer from '../../../components/shared/Footer'
import EditPhoto from '../../../components/shared/EditPhoto'
import EditParagraph from '../../../components/shared/EditPargraph'
import NavBar from '../../../components/shared/Navbar'
import EditBody from '../../../components/blog/EditBody';


interface Props {
    blog: {
        title: string;
        intro: string;
        description: string;
        paragraphs: string[];
        photos: string[];
        order: string[];
        linkUrl: string;
        linkDescription: string;
        mainPhoto: string;
        _id: string;
    }
}


const EditBlog: NextPage<Props> = ({ blog }) => {
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

    const [ paragraphsArr, setParagraphsArr ] = useState(blog.paragraphs);
    const [ photoStrArr, setPhotoStrArr ] = useState(blog.photos);
    const { loading, data } = useGetUser();
    const [ errors, setErrors ] = useState({});
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ ready, setReady ] = useState(true);

    const router = useRouter();
    const [ scrolled, setScrolled ] = useState(false);

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
      }, []);

      const handleScroll = () => {
        if (window.pageYOffset > 47) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    const [ hidden, setHidden ] = useState(false);
    
    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, []);

    const handleResize = () => {
        if (window.innerWidth <= 700) {
            setHidden(true);
        } else {
            setHidden(false)
        }
    }

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

    const handleTextInput = (index, value) => {

        let newArr = [...blog.paragraphs];
        newArr[index] = value;
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
        if (index !== 999) { 
            let newArr = [...photoStrArr];
            newArr[index] = value;
            setPhotoStrArr(newArr);
            setForm({
                ...form,
                photos: newArr
            })
        } else {
            setForm({
                ...form, 
                mainPhoto: value
            })
        }
    }

    const editInput = () => {
        const bodyOrder: string[] = blog.order.slice();
        
        const bodyPhotos: string[] = form.photos.slice()
        const bodyParagraphs: string[] = form.paragraphs.slice()
        const body = bodyOrder.map((el) => {
            if (el == 'photo') {
                const nextPhoto = bodyPhotos.shift()
                return <EditPhoto source={`${nextPhoto}`} photoNumber={"photo" + (form.photos.indexOf(nextPhoto + 1))} editPhotoArr={handleFileUpload} />
            } else {
                const nextParagraph = bodyParagraphs.shift()
                const index = form.paragraphs.indexOf(nextParagraph)
                return <EditParagraph sendInput={handleTextInput} value={nextParagraph} idx={index}/>
            }
        })
        
        return (
            <div className="flex justify-center flex-col items-center w-full" >{body}</div>
            )
    }
    return (
        <>
        <BaseLayout data={data} loading={loading}>
        {scrolled && !hidden ? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
            <div className="flex w-full justify-center">
                <form className="flex flex-col items-center w-3/4" onSubmit={handleSubmit}>
                    <h1 className="text-4xl">Edit your Blog Post</h1>
                    <label className="text-2xl pt-4 pb-2" htmlFor="title">Title</label>
                        <input type="text" onChange={handleChange} value={form.title} className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Grab their attention!" name="title"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="intro">Introduction</label>
                        <textarea onChange={handleChange} value={form.intro} className="w-72 h-24 p-3 my-3 border-2 border-gray-200 rounded-md" placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="description">Description</label>
                        <textarea onChange={handleChange} value={form.description} className="w-full h-72 p-3 my-3 border-2 border-gray-200 rounded-md" placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="linkUrl">Source Link</label>
                        <input onChange={handleChange} value={form.linkUrl} className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0" type="text" placeholder="Paste the URL of the original article" name="linkUrl"  />
                    <label className="text-2xl pt-4 pb-2" htmlFor="linkDescription">Link Text</label>
                        <input onChange={handleChange} value={form.linkDescription} className="text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" type="text" placeholder="How do you want the link text to appear?" name="linkDescription"  />
                    <EditPhoto source={form.mainPhoto} photoNumber={'photo-1000'} editPhotoArr={handleFileUpload} />
                    <EditBody bodyOrder={blog.order} bodyParagraphs={form.paragraphs} bodyPhotos={form.photos} sendInput={handleTextInput} handleFileUpload={handleFileUpload}/>
                    {/* {editInput()} */}
                    <button className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 my-2 transition duration-300 ease-in-out mr-6" >Save Changes</button>
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