import { useState, useEffect, useReducer } from 'react'
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
    // const [form, setForm] = useState({
    //     title: project.title, 
    //     intro: project.intro, 
    //     description: project.description,  
    //     mainPhoto: project.mainPhoto,
    //     linkUrl: project.linkUrl,
    //     linkDescription: project.linkDescription,
    //     paragraphs: project.paragraphs,
    //     photos: project.photos
    // });

    const initialState = {
        input: [],
        photoStrArr: [],
        paraCount: 1,
        photoCount: 1,
        paragraphsArr: [],
        order: [],
        errors: {
            'title': '',
            'message': '',
            'type': ''
        },
        form: {
            title: '', 
            intro: '', 
            type: '',
            description: '', 
            paragraphs: [],
            mainPhoto: '',
            photos: [],
            linkUrl: '',
            linkDescription: ''
        }
    }

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

    const reducer = (state, action) => {
        debugger
        switch (action.type) {
          case 'ADD_PROJECT_TYPE':
            return {
                ...state,
                form: { ...state.form, type: action.projectType}
            }
            break;
          case 'MODIFY_TITLE':
            return {
                ...state,
                form: { ...state.form, title: action.title }
            }
            break;
          case 'MODIFY_INTRO':
            return {
                ...state,
                form: { ...state.form, intro: action.intro }
            }
            break;
            case 'MODIFY_DESCRIPTION':
            return {
                ...state,
                form: { ...state.form, description: action.description }
            }
            break;
            case 'MODIFY_LINK_URL':
            return {
                ...state,
                form: { ...state.form, linkUrl: action.linkUrl }
            }
            break;
            case 'MODIFY_LINK_DESCRIPTION':
            return {
                ...state,
                form: { ...state.form, linkDescription: action.linkDescription }
            }
            break;
            case 'POST_MAIN_PHOTO':
            return {
                ...state,
                form: { ...state.form, mainPhoto: action.mainPhoto }
            }
            break;
            case 'APPEND_PHOTO':
            let photoInputNum = `phot-${state.photoCount}`
            return {
                ...state,
                photoCount: state.photoCount + 1,
                input: state.input.concat(photoInputNum),
                order: state.order.concat('photo')
            }
            break;
            case 'UPLOAD_PHOTO':
            let newArr = [...state.photoStrArr];
            newArr[action.index] = action.value;
            return {
                ...state,
                form: { ...state.form, photos: newArr },
                photoStrArr: newArr
            }
            break;
            case 'APPEND_PARAGRAPH':
            let paraInputNum = `para-${state.paraCount}`;
            return {
                ...state,
                paraCount: state.paraCount + 1,
                input: state.input.concat(paraInputNum),
                order: state.order.concat('paragraph')
            }
            break;
            case 'SET_PARAGRAPH':
            let paraArr = [...state.paragraphsArr];
            paraArr[action.index] = action.text;
            return {
                ...state,
                paragraphsArr: paraArr,
                form: { ...state.form, paragraphs: paraArr }
            }
            break;
            case 'NO_TITLE_ERROR':
            return {
                ...state,
                errors: { ...state.errors, title: 'A title is required', message: 'Please see errors above' }
            }
            break;
            case 'NO_TYPE_ERROR':
            return {
                ...state,
                errors: { ...state.errors, type: 'Please select a type', message: 'Please see errors above' }
            }
            break;
            case 'RESET_ERRORS':
            return {
                ...state,
                errors: { ...state.errors, type: '', message: '', title: '' }
            }
            break;
            case 'RESET_TITLE_ERROR':
            return {
                ...state,
                errors: { ...state.errors, title: '' }
            }
            break;
            case 'RESET_TYPE_ERROR':
            return {
                ...state,
                errors: { ...state.errors, type: '' }
            }
            break;
          default:
            return state;
        }
      };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.form.title != '' && state.form.type != '') {
            dispatch({ type: 'RESET_ERRORS'})
        }
        if (state.form.title != '' && state.errors.title != '') {
            dispatch({ type: 'RESET_TITLE_ERROR'}) 
        } 
        if (state.form.type != '' && state.errors.type != '') {
            dispatch({ type: 'RESET_TYPE_ERROR'}) 
        } 
    }, [state.form.title, state.form.type ])


    // checks for errors

    const validate = () => {    

        if (state.form.title == '') {
            dispatch({ type: 'NO_TITLE_ERROR'})
        } 
        if (state.form.type == '' ) {
            dispatch({ type: 'NO_TYPE_ERROR'})
        }
        if (state.form.title != '' && state.form.type != '') {
            debugger
            // dispatch({ type: 'RESET_ERRORS' })
            updateProject();
        }

    }

    const appendParagraph = () => {

        dispatch({ type: 'APPEND_PARAGRAPH'});
    }

    const handleFileUpload = (index, value) => {
        dispatch({ type: 'UPLOAD_PHOTO', index, value })
    }

    const handleTextInput = (index, text) => {
        dispatch({ type: 'SET_PARAGRAPH', index, text })
    }

    const updateProject = () => {

        axios.put(`/api/projects/${router.query.id}`, {
            title: state.form.title,
            intro: state.form.intro,
            description: state.form.description,
            mainPhoto: state.form.mainPhoto,
            linkUrl: state.form.linkUrl,
            linkDescription: state.form.linkDescription,
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
            <div className="flex w-full justify-center pb-48 font-sans">
                <form className="flex flex-col items-center w-3/4 font-sans" onSubmit={handleSubmit}>
                    <h1 className="text-4xl">Edit your Blog Post</h1>
                    <label className="text-2xl pt-4 pb-2 font-sans" htmlFor="title">Title</label>
                        <input type="text" onChange={handleChange} value={state.form.title} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Grab their attention!" name="title"  />
                    <label className="font-sans text-2xl pt-4 pb-2" htmlFor="intro">Introduction</label>
                        <textarea onChange={handleChange} value={state.form.intro} className="font-sans w-72 h-24 p-3 my-3 border-2 border-gray-200 rounded-md" placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro"  />
                    <label className="font-sans text-2xl pt-4 pb-2" htmlFor="description">Description</label>
                        <textarea onChange={handleChange} value={state.form.description} className="font-sans w-full h-72 p-3 my-3 border-2 border-gray-200 rounded-md" placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description"  />
                    <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkUrl">Source Link</label>
                        <input onChange={handleChange} value={state.form.linkUrl} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0" type="text" placeholder="Paste the URL of the original article" name="linkUrl"  />
                    <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkDescription">Link Text</label>
                        <input onChange={handleChange} value={state.form.linkDescription} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" type="text" placeholder="How do you want the link text to appear?" name="linkDescription"  />
                    <EditPhoto source={state.form.mainPhoto} photoNumber={'photo-1000'} editPhotoArr={handleFileUpload} />
                    <EditBody bodyOrder={project.order} bodyParagraphs={state.form.paragraphs} bodyPhotos={form.photos} sendInput={handleTextInput} handleFileUpload={handleFileUpload}/>
                    <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 my-2 transition duration-300 ease-in-out mr-6" >Save Changes</button>
                </form>
            </div>

            <div className="h-24"></div>
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