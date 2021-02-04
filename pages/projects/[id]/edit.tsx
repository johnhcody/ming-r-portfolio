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
import EditBody from '../../../components/shared/EditBody';


interface Props {
    project: {
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


const EditProject: NextPage<Props> = ({ project }) => {
    const [form, setForm] = useState({
        title: project.title, 
        intro: project.intro, 
        description: project.description,  
        mainPhoto: project.mainPhoto,
        linkUrl: project.linkUrl,
        linkDescription: project.linkDescription,
        paragraphs: project.paragraphs,
        photos: project.photos
    });

    const [ paragraphsArr, setParagraphsArr ] = useState(project.paragraphs);
    const [ photoStrArr, setPhotoStrArr ] = useState(project.photos);
    const { loading, data } = useGetUser();
    const [ errors, setErrors ] = useState({});
    const [ isSubmitting, setIsSubmitting ] = useState(false);

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

        let newArr = [...project.paragraphs];
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

    const [width, setWidth] = useState(null);
        function handleWindowSizeChange() {
                setWidth(window.innerWidth);
            }

    useEffect(() => {
        if (typeof window !== 'undefined') setWidth(window.innerWidth)
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

        let isMobile: boolean = (width <= 768);


    return (
        <>
        <BaseLayout data={data} loading={loading}>
        {scrolled && !isMobile ? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
            <div className="flex w-full justify-center pb-48">
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
                    <EditBody bodyOrder={project.order} bodyParagraphs={form.paragraphs} bodyPhotos={form.photos} sendInput={handleTextInput} handleFileUpload={handleFileUpload}/>
                    <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 my-2 transition duration-300 ease-in-out mr-6" >Save Changes</button>
                </form>
            </div>
            <div className="h-28"></div>
        </BaseLayout>
        <Footer />
        </>
    )

}

EditProject.getInitialProps = async ({ query: { id } }) => {
    const res = await axios.get(`/api/projects/${id}`)
    const project = res.data['data'];
    return { project: project }
}

export default EditProject;