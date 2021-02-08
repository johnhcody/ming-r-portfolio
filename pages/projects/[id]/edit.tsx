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
import Dropdown from '../../../components/shared/Dropdown'

interface Props {
    project: {
        title: string;
        intro: string;
        type: string;
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
        photoStrArr: project.photos,
        paraCount: project.paragraphs.length + 1,
        photoCount: project.photos.length + 1,
        paragraphsArr: project.paragraphs,
        order: project.order,
        errors: {
            'title': '',
            'message': '',
            'type': ''
        },
        form: {
            title: project.title, 
            intro: project.intro, 
            type: project.type,
            description: project.description, 
            paragraphs: project.paragraphs,
            mainPhoto: project.mainPhoto,
            photos: project.photos,
            linkUrl: project.linkUrl,
            linkDescription: project.linkDescription
        }
    }

    const [ paragraphsArr, setParagraphsArr ] = useState(project.paragraphs);
    const [ photoStrArr, setPhotoStrArr ] = useState(project.photos);
    const { loading, data } = useGetUser();
    const [ errors, setErrors ] = useState({});
    const [ isSubmitting, setIsSubmitting ] = useState(false);

    const router = useRouter();
    const [ scrolled, setScrolled ] = useState(false);


    // display navbar on scroll

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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const postChanges = () => {
        validate();
    }

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
                debugger
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
            debugger
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
            updateProject();
        }

    }

    const appendParagraph = () => {
        dispatch({ type: 'APPEND_PARAGRAPH'});
    }
    
    const appendPhoto = () => {
        dispatch({ type: 'APPEND_PHOTO' })    
    } 

    const handleMainPhoto = (key, value) => {
        dispatch({ type: 'POST_MAIN_PHOTO', mainPhoto: value})
    }

    const handleFileUpload = (index, value) => {
        debugger
        dispatch({ type: 'UPLOAD_PHOTO', index, value })
    }

    const handleTextInput = (index, text) => {
        dispatch({ type: 'SET_PARAGRAPH', index, text })
    }

    const addProjectType = (projectType) => {
        dispatch({ type: 'ADD_PROJECT_TYPE', projectType })
    }

    const updateProject = () => {

        axios.put(`/api/projects/${router.query.id}`, {
            title: state.form.title,
            intro: state.form.intro,
            type: state.form.type,
            description: state.form.description,
            mainPhoto: state.form.mainPhoto,
            linkUrl: state.form.linkUrl,
            linkDescription: state.form.linkDescription,
            paragraphs: state.form.paragraphs,
            photos: state.form.photos
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
        
    const handleChange = (e) => {
            switch (e.target.name) {
                case 'title':
                    dispatch({ type: 'MODIFY_TITLE', title: e.target.value})
                    break;
                case 'intro':
                    dispatch({ type: 'MODIFY_INTRO', intro: e.target.value})
                    break;
                case 'description':
                    dispatch({ type: 'MODIFY_DESCRIPTION', description: e.target.value})
                    break;
                case 'linkUrl':
                    dispatch({ type: 'MODIFY_LINK_URL', linkUrl: e.target.value})
                    break;
                case 'linkDescription':
                    dispatch({ type: 'MODIFY_LINK_DESCRIPTION', linkDescription: e.target.value})
                    break;
                default:
                    break;
            }
    }

    return (
        <>
        <BaseLayout data={data} loading={loading}>
        {scrolled && !isMobile ? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
            <div className="flex w-full justify-center pb-48 font-sans">
                <form className="flex flex-col items-center w-3/4 font-sans" onSubmit={handleSubmit}>
                    <h1 className="text-4xl">Edit your Blog Post</h1>
                    <Dropdown sendType={addProjectType}/>
                    {state.errors && state.errors.type ? <h1 className="font-sans text-2xl text-red-500">{state.errors.type}</h1> : null }

                    <label className="text-2xl pt-4 pb-2 font-sans" htmlFor="title">{state.form.type} Title</label>
                        <input type="text" onChange={handleChange} value={state.form.title} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Grab their attention!" name="title"  />
                        {state.errors && state.errors.title ? <h1 className="font-sans text-2xl text-red-500">{state.errors.title}</h1> : null}

                    <label className="font-sans text-2xl pt-4 pb-2" htmlFor="intro">{state.form.type} Introduction</label>
                        <textarea onChange={handleChange} value={state.form.intro} className="font-sans w-72 h-24 p-3 my-3 border-2 border-gray-200 rounded-md" placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro"  />
                    <label className="font-sans text-2xl pt-4 pb-2" htmlFor="description">{state.form.type} Description</label>
                        <textarea onChange={handleChange} value={state.form.description} className="font-sans w-full h-72 p-3 my-3 border-2 border-gray-200 rounded-md" placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description"  />
                    <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkUrl">{state.form.type} Source Link</label>
                        <input onChange={handleChange} value={state.form.linkUrl} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0" type="text" placeholder="Paste the URL of the original article" name="linkUrl"  />
                    <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkDescription">{state.form.type} Link Text</label>
                        <input onChange={handleChange} value={state.form.linkDescription} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" type="text" placeholder="How do you want the link text to appear?" name="linkDescription"  />
                    <EditPhoto source={state.form.mainPhoto} photoNumber={'photo-1000'} editPhotoArr={handleMainPhoto} />
                    <EditBody bodyOrder={project.order} bodyParagraphs={state.form.paragraphs} bodyPhotos={state.form.photos} sendInput={handleTextInput} handleFileUpload={handleFileUpload}/>

                        {/* <div className="pb-8 flex flex-col items-center">
                            Not working yet...
                            Need to add a new slice of state to map through the 'newInput' similar to create-new page

                            <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 my-2 transition duration-300 ease-in-out mr-6" onClick={appendPhoto} >Add Photo</button>
                            <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 my-2 transition duration-300 ease-in-out mr-6" onClick={appendParagraph}>Add Paragraph</button>

                        </div> */}
                        <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white hover:text-red-500 rounded-full font-bold px-4 py-3 my-2 transition duration-300 ease-in-out mr-6"onClick={postChanges} >Save Changes</button>
                        {state.errors && state.errors.message != '' ? <h1 className="pt-2 text-red-500">{state.errors.message}</h1> : null}


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