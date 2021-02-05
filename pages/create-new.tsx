import React, { useState, useEffect, useReducer, useRef } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { useGetUser } from '../actions/user'
import { useRouter } from 'next/router'
import BlogPhotoUpload from '../components/shared/BlogPhotoUpload'
import BlogParagraphUpload from '../components/shared/BlogParagraphUpload'
import Footer from '../components/shared/Footer'
import axios from 'axios'
import Upload from '../components/shared/Upload'
import Dropdown from '../components/shared/Dropdown'
import NavBar from '../components/shared/Navbar'

interface Props {
    
}

const CreateNew:React.FC = props => {

    // handles auth
    const { loading, data } = useGetUser();


    // handles when to display NavBar
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
    

    // sends POST request if there are no errors
    useEffect(() => {
        if (state.isSubmitting) {
            debugger
            if (Object.values(state.errors).filter(el => el != '').length === 0) {
                createProject();
            } else {
                console.log(state.errors)
                state.isSubmitting = false;
            }
        }
    })

    // new state management
    const initialState = {
        input: [],
        photoStrArr: [],
        paraCount: 1,
        photoCount: 1,
        paragraphsArr: [],
        order: [],
        isSubmitting: false,
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

    const inputRef = useRef();
    useEffect(() => {
        console.log(inputRef.current.name);
    });

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
                form: { ...state.form, photos: newArr }
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
          default:
            return state;
        }
      };

    const [state, dispatch] = useReducer(reducer, initialState);

    
    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
    }

    const validate = () => {    
        // let err = {
        //     'title': '',
        //     'message': '',
        //     'type': ''
        // };
        
        // if (form.title == '') {
        //     err['title'] = "Title is required";
        // } if (form.type == '') {
        //     err['type'] = "Please select a project type";
        // } if (Object.values(err).length > 0 && err['message'] == '' ) {
        //     err['message'] = "See errors above" 
        // } if (form.type != '' && form.title != '') {
        //     err = {
        //         'title': '',
        //         'message': '',
        //         'type': ''
        //     };
        // } if (form.type != '' && form.title == '') {
        //     err = {
        //         'title': 'Title is required',
        //         'message': 'See errors above',
        //         'type': ''
        //     }
        // } if (form.type == '' && form.title != '') {
        //     err = {
        //         'title': '',
        //         'message': 'See errors above',
        //         'type': 'Please select a project type'
        //     }
        // }
        // debugger
        // return err;
    }

    let router = useRouter();
    const createProject = () => {
        debugger
        axios.post(`/api/projects`, {
            title: state.form.title,
            intro: state.form.intro,
            type: state.form.type,
            description: state.form.description,
            paragraphs: state.paragraphsArr.filter(el => el !== null),
            photos: state.photoStrArr.filter(el => el !== null),
            order: state.order,
            linkUrl: state.form.linkUrl,
            linkDescription: state.form.linkDescription,
            mainPhoto: state.form.mainPhoto
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        router.push('/');    
    }

    const appendParagraph = () => {

        dispatch({ type: 'APPEND_PARAGRAPH'});
    }

    const handleFileUpload = (index, value) => {
        // let newArr = [...photoStrArr];
        // newArr[index] = value;
        // setPhotoStrArr(newArr);
        // setForm({
        //     ...form,
        //     photos: newArr
        // })
        dispatch({ type: 'UPLOAD_PHOTO', index, value })
    }



    const handleTextInput = (index, text) => {
        dispatch({ type: 'SET_PARAGRAPH', index, text })
    }

    const postBlog = (e) => {
        // debugger
        // let errs = validate();
        // setErrors(errs)
        // debugger
        // if (Object.values(errors).filter(el => el != '').length === 0) setIsSubmitting(true);
    }


    //new posting method

    const addProjectType = (projectType) => {
        dispatch({ type: 'ADD_PROJECT_TYPE', projectType })
    }
    
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

    const handleMainPhoto = (key, value) => {
        dispatch({ type: 'POST_MAIN_PHOTO', mainPhoto: value})
    }

    const appendPhoto = () => {
        dispatch({ type: 'APPEND_PHOTO' })    
    }

    // const deleteParagraph = (inputIndex, typeIndex) => {

            
    //         let inputCopy = [...input];
    //         setInput(inputCopy.filter((el, i) => i != inputIndex && el != null))
    //         let newArr = [...paragraphsArr];
    //         setParagraphsArr(newArr.filter((el, i) => i != typeIndex && el != null));
            
    //         setForm({
    //             ...form,
    //             paragraphs: newArr.filter((el, i) => i != typeIndex && el != null)
    //         }) 
            
    // }

    // const deletePhoto = (inputIndex, typeIndex) => {
    //         let inputCopy = [...input];
    //         inputCopy = inputCopy.splice(inputIndex, 1)
            
    //         setInput(inputCopy)
    //         let newArr = [...photoStrArr];

    //         newArr = newArr.splice(typeIndex, 1)
    //         // delete newArr[typeIndex];
    //         // newArr = newArr.filter(el => el != null)
    //         setPhotoStrArr(newArr);
    //         setForm({
    //             ...form,
    //             photos: newArr
    //         }) 
    // }

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
                {scrolled && !isMobile? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
                <div className="flex w-full justify-center">
                    <form className="flex flex-col items-center w-4/5" onSubmit={handleSubmit}>
                        <h1 className="text-4xl">Create a New Blog Post</h1>
                        <Dropdown sendType={addProjectType}/>
                        {state.errors && state.errors.type ? <h1 className="font-sans text-2xl text-red-500">{state.errors.type}</h1> : null }
                        <label className="font-sans text-2xl pt-4 pb-2" htmlFor="title">{state.form.type} Title</label>
                            <input ref={inputRef} type="text" onChange={handleChange} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Grab their attention!" name="title"  />
                        {state.errors && state.errors.title ? <h1 className="font-sans text-2xl text-red-500">{state.errors.title}</h1> : null}
                        <label className="font-sans text-2xl pt-4 pb-2" htmlFor="intro">{state.form.type} Introduction</label>
                            <textarea ref={inputRef} onChange={handleChange} className="leading-normal font-sans border-2 rounded-md text-center w-full h-24 p-3 my-3" placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro"  />
                        <label className="font-sans text-2xl pt-4 pb-2" htmlFor="description">{state.form.type} Description</label>
                            <textarea ref={inputRef} onChange={handleChange} className="leading-normal font-sans border-2 rounded-md text-center w-full h-72 p-3 my-3" placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description"  />
                            <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkUrl">{state.form.type} Link URL</label>
                        <input ref={inputRef} type="text" onChange={handleChange} className="leading-normal font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Copy and Paste Link Address" name="linkUrl"  />
                            <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkDescription">{state.form.type} Link Description</label>
                        <input ref={inputRef} type="text" onChange={handleChange} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Text that will appear on hyperlink" name="linkDescription"  />
                        <span className="font-sans text-2xl pt-4 pb-2" >Upload your Main Photo</span>
                        <Upload name={"mainPhoto"} sendPhotoString={handleMainPhoto} title={"Main Photo"} />
                        {state.input.map((ipt, idx) => {
                        let word = ipt.slice(0,5);
     
                        if (word == 'phot-') {
                            return <BlogPhotoUpload key={idx} photoNumber={ipt} sendPhotoStr={handleFileUpload}  />
                        } else if (word == 'para-'){
                            return <BlogParagraphUpload key={idx} inputIndex={idx} paragraphNumber={ipt} deleteElement={deleteParagraph} addText={handleTextInput}/>
                        }
                        })}
                        <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full" onClick={appendPhoto}>Add Photo</button>    
                        <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full outline:nones" onClick={appendParagraph}>Add Paragraph</button>
                        <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full outline:none" type="submit" onClick={postBlog} > Post {`${form.type}`}</button>
                        {errors && errors.message != '' ? <h1 className="pt-2 text-red-500">{errors.message}</h1> : null}
                    </form>
                </div>
                <div className="h-24"></div>
            </BaseLayout>
            <Footer />
            </>
        )
    // }
    
    
}

export default CreateNew;