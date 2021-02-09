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
import RichTextEditor from '../components/shared/RichTextEditor'
import { initialState } from '../constants/Project.constants'
import { reducer } from '../reducers/Project.reducer'

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

    const [state, dispatch] = useReducer(reducer, initialState);

    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
            createProject();
        }

    }

    let router = useRouter();
    const createProject = () => {
        axios.post(`/api/projects`, {
            title: state.form.title,
            intro: state.form.intro,
            type: state.form.type,
            description: state.form.description,
            paragraphs: state.paragraphsArr,
            photos: state.photoStrArr,
            order: state.order,
            linkUrl: state.form.linkUrl,
            linkDescription: state.form.linkDescription,
            mainPhoto: state.form.mainPhoto,
            text: state.form.text
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
        dispatch({ type: 'UPLOAD_PHOTO', index, value })
    }

    const handleTextInput = (index, text) => {
        dispatch({ type: 'SET_PARAGRAPH', index, text })
    }

    const postBlog = (e) => {
        validate();
    }


    //new posting method

    const addProjectType = (projectType) => {
        dispatch({ type: 'ADD_PROJECT_TYPE', projectType })
    }
    
    const handleChange = (e) => {
        dispatch({ type: 'MODIFY_ELEMENT', element: e.target.name, value: e.target.value})
    }

    const handleMainPhoto = (key, value) => {
        dispatch({ type: 'POST_MAIN_PHOTO', mainPhoto: value})
    }

    const appendPhoto = () => {
        dispatch({ type: 'APPEND_PHOTO' })    
    }


     const deleteParagraph = (inputIndex, typeIndex) => {

            
    //         let inputCopy = [...input];
    //         setInput(inputCopy.filter((el, i) => i != inputIndex && el != null))
    //         let newArr = [...paragraphsArr];
    //         setParagraphsArr(newArr.filter((el, i) => i != typeIndex && el != null));
            
    //         setForm({
    //             ...form,
    //             paragraphs: newArr.filter((el, i) => i != typeIndex && el != null)
    //         }) 
            
     }

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


    // logic for mobile viewing

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
    
    const handleRichText = (index, text) => {
        debugger
        dispatch({ type: 'SET_PARAGRAPH', index, text })
    }
    // const handleTextInput = (index, text) => {
    //     dispatch({ type: 'SET_PARAGRAPH', index, text })
    // }

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
                            <input type="text" onChange={handleChange} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Grab their attention!" name="title"  />
                        {state.errors && state.errors.title ? <h1 className="font-sans text-2xl text-red-500">{state.errors.title}</h1> : null}
                        <label className="font-sans text-2xl pt-4 pb-2" htmlFor="intro">{state.form.type} Introduction</label>
                            <textarea onChange={handleChange} className="leading-normal font-sans border-2 rounded-md text-center w-full h-24 p-3 my-3" placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro"  />
                        <label className="font-sans text-2xl pt-4 pb-2" htmlFor="description">{state.form.type} Description</label>
                            <textarea onChange={handleChange} className="leading-normal font-sans border-2 rounded-md text-center w-full h-72 p-3 my-3" placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description"  />
                            <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkUrl">{state.form.type} Link URL</label>
                        <input type="text" onChange={handleChange} className="leading-normal font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Copy and Paste Link Address" name="linkUrl"  />
                            <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkDescription">{state.form.type} Link Description</label>
                        <input type="text" onChange={handleChange} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Text that will appear on hyperlink" name="linkDescription"  />
                        <span className="font-sans text-2xl pt-4 pb-2" >Upload your Main Photo</span>
                        <Upload name={"mainPhoto"} sendPhotoString={handleMainPhoto} title={"Main Photo"} />
                        {state.input.map((ipt, idx) => {
                        let word = ipt.slice(0,5);
     
                        if (word == 'phot-') { 
                            return <BlogPhotoUpload key={idx} photoNumber={ipt} sendPhotoStr={handleFileUpload}  />
                        } else if (word == 'para-'){
                            return <RichTextEditor placeholder="Create your post here" inputIndex={idx} paragraphNumber={ipt} editedText={''} sendText={handleRichText} />
                            // return <BlogParagraphUpload key={idx} inputIndex={idx} deleteElement={deleteParagraph} paragraphNumber={ipt} addText={handleTextInput}/>
                        }
                        })}
                        <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full" onClick={appendPhoto}>Add Photo</button>    
                        <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full outline:nones" onClick={appendParagraph}>Add Paragraph</button>
                        
                        
                        {/* <RichTextEditor placeholder="Create your post here" editedText={''} sendText={handleRichText}/> */}
                        <div className="h-24"></div>
                        <button className="focus:outline-none focus:ring font-sans focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full outline:none mt" type="submit" onClick={postBlog} > Post {`${state.form.type}`}</button>
                        {state.errors && state.errors.message != '' ? <h1 className="pt-2 text-red-500">{state.errors.message}</h1> : null}
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