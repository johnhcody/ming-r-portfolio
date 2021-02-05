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
    const { loading, data } = useGetUser();
    
    const [ input, setInput ] = useState([]);
    const [ photoStrArr, setPhotoStrArr ] = useState([])
    const [ paraCount, setParaCount ] = useState(1);
    const [ photoCount, setPhotoCount ] = useState(1);
    const [ paragraphsArr, setParagraphsArr ] = useState([])
    const [ order, setOrder ] = useState([]);
    const [ isSubmitting, setIsSubmitting] = useState(false);
    const [ errors, setErrors] = useState({
        'title': '',
        'message': '',
        'type': ''
    });

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

    const [form, setForm] = useState({
        title: '', 
        intro: '', 
        type: '',
        description: '', 
        paragraphs: [],
        mainPhoto: '',
        photos: [],
        linkUrl: '',
        linkDescription: ''
    })

    const inputRef = useRef();

    const reducer = (state, action) => {
        switch (action.type) {
          case 'ADD_PROJECT_TYPE':
              debugger
            return {
                ...state,
                
                
            }
          case 'ADD_TITLE':
            debugger
            return {
                ...state,
                form: { ...state.form, title: action.title }
            }
          default:
            return state;
        }
      };

    const [state, dispatch] = useReducer(reducer, initialState);


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
    
    useEffect(() => {
        if (isSubmitting) {
            debugger
            if (Object.values(errors).filter(el => el != '').length === 0) {
                createProject();
            } else {
                console.log(errors)
                setIsSubmitting(false);
            }
        }
    })
    
    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
    }

    const validate = () => {    
        let err = {
            'title': '',
            'message': '',
            'type': ''
        };
        
        if (form.title == '') {
            err['title'] = "Title is required";
        } if (form.type == '') {
            err['type'] = "Please select a project type";
        } if (Object.values(err).length > 0 && err['message'] == '' ) {
            err['message'] = "See errors above" 
        } if (form.type != '' && form.title != '') {
            err = {
                'title': '',
                'message': '',
                'type': ''
            };
        } if (form.type != '' && form.title == '') {
            err = {
                'title': 'Title is required',
                'message': 'See errors above',
                'type': ''
            }
        } if (form.type == '' && form.title != '') {
            err = {
                'title': '',
                'message': 'See errors above',
                'type': 'Please select a project type'
            }
        }
        debugger
        return err;
    }

    let router = useRouter();
    const createProject = () => {
        debugger
        axios.post(`/api/projects`, {
            title: form.title,
            intro: form.intro,
            type: form.type,
            description: form.description,
            paragraphs: paragraphsArr.filter(el => el !== null),
            photos: photoStrArr.filter(el => el !== null),
            order: order,
            linkUrl: form.linkUrl,
            linkDescription: form.linkDescription,
            mainPhoto: form.mainPhoto
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        router.push('/');    
    }


    const appendPhoto = () => {
        setPhotoCount(photoCount + 1);
        let newInput = `phot-${photoCount}`;
        setInput(input.concat(newInput));
        constructOrder('photo')
         
    }

    const appendParagraph = () => {
        setParaCount(paraCount + 1);
        let newInput = `para-${paraCount}`;
        setInput(input.concat(newInput));
        constructOrder('paragraph')
    }

    const constructOrder = (blockType) => {
        let newOrder = [...order]
        newOrder.push(blockType)
        setOrder(newOrder)
    }

    const handleFileUpload = (index, value) => {
        let newArr = [...photoStrArr];
        newArr[index] = value;
        setPhotoStrArr(newArr);
        setForm({
            ...form,
            photos: newArr
        })
        
    }

    const handleMainPhoto = (key, value) => {
        setForm({
            ...form,
            'mainPhoto': value
        })
    }

    const handleTextInput = (index, text) => {
        let newArr = [...paragraphsArr];
        newArr[index] = text;
        setParagraphsArr(newArr);
        setForm({
            ...form,
            paragraphs: newArr
        })  
    }

    const handleChange = (e) => {

        if (e.target.name == 'title') {
            debugger
            let errs = validate()
            setErrors(errs)
            debugger
            setForm({
                ...form,
                [e.target.name]: e.target.value 
            })
        } else {
            debugger
            setForm({
                ...form,
                [e.target.name]: e.target.value 
            })
    }


        
        // if (e.target.name == "title" && e.target.value !== '') setErrors['title'] = '';
        // if (e.target.name == "title" && errors.title !== '') setErrors['title'] = '';
        // if (e.target.name == "type" && e.target.value !== '') setErrors['type'] = '';
        // if (e.target.name == "type" && errors.type !== '') setErrors['type'] = '';
        // if (Object.values(errors).length == 1 && errors.message) setErrors['message'] = ''
    };

    const handleErrors = () => {

    }

    const postBlog = (e) => {
        debugger
        let errs = validate();
        setErrors(errs)
        debugger
        if (Object.values(errors).filter(el => el != '').length === 0) setIsSubmitting(true);
    }

    const handleType = (projectType) => {
        debugger
        // setForm({
        //     ...form,
        //     'type': projectType 
        // })
        if (errors.message != '') {
            let errs = validate();
            setErrors(errs)
            setForm({
                ...form,
                'type': projectType 
            })
        } else {
            setForm({
                ...form,
                'type': projectType 
            })
        }

        
    }

    const addProjectType = (projectType) => {
        dispatch({ type: 'ADD_PROJECT_TYPE', projectType })
    }

    const addTitle = (e) => {
        debugger
        dispatch({ type: 'ADD_TITLE', title: e.target.value})
    }

    const deleteParagraph = (inputIndex, typeIndex) => {

            
            let inputCopy = [...input];
            setInput(inputCopy.filter((el, i) => i != inputIndex && el != null))
            let newArr = [...paragraphsArr];
            
            // newArr.splice(typeIndex, 1)
            // delete newArr[typeIndex];
            // newArr = newArr.filter(el => el != null)
            setParagraphsArr(newArr.filter((el, i) => i != typeIndex && el != null));
            
            setForm({
                ...form,
                // paragraphs: paragraphsArr
                paragraphs: newArr.filter((el, i) => i != typeIndex && el != null)
            }) 
            
    }

    const deletePhoto = (inputIndex, typeIndex) => {
            let inputCopy = [...input];
            inputCopy = inputCopy.splice(inputIndex, 1)
            
            setInput(inputCopy)
            let newArr = [...photoStrArr];

            newArr = newArr.splice(typeIndex, 1)
            // delete newArr[typeIndex];
            // newArr = newArr.filter(el => el != null)
            setPhotoStrArr(newArr);
            setForm({
                ...form,
                photos: newArr
            }) 
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
                {scrolled && !isMobile? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
                <div className="flex w-full justify-center">
                    <form className="flex flex-col items-center w-4/5" onSubmit={handleSubmit}>
                        <h1 className="text-4xl">Create a New Blog Post</h1>
                        <Dropdown sendType={addProjectType}/>
                        {errors && errors.type ? <h1 className="font-sans text-2xl text-red-500">{errors.type}</h1> : null }
                        <label className="font-sans text-2xl pt-4 pb-2" htmlFor="title">{form.type} Title</label>
                            <input type="text" onChange={(e) => addTitle(e)} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Grab their attention!" name="title"  />
                        {errors && errors.title ? <h1 className="font-sans text-2xl text-red-500">{errors.title}</h1> : null}
                        <label className="font-sans text-2xl pt-4 pb-2" htmlFor="intro">{form.type} Introduction</label>
                            <textarea onChange={handleChange} className="leading-normal font-sans border-2 rounded-md text-center w-full h-24 p-3 my-3" placeholder="Tell us a bit about your work!  This will appear on the main page." name="intro"  />
                        <label className="font-sans text-2xl pt-4 pb-2" htmlFor="description">{form.type} Description</label>
                            <textarea onChange={handleChange} className="leading-normal font-sans border-2 rounded-md text-center w-full h-72 p-3 my-3" placeholder="Go into more detail about the project.  This will appear when people view the specific project." name="description"  />
                            <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkUrl">{form.type} Link URL</label>
                        <input type="text" onChange={handleChange} className="leading-normal font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Copy and Paste Link Address" name="linkUrl"  />
                            <label className="font-sans text-2xl pt-4 pb-2" htmlFor="linkDescription">{form.type} Link Description</label>
                        <input type="text" onChange={handleChange} className="font-sans text-center w-72 border-b-2 focus:outline-none border-t-0 border-l-0 border-r-0 mb-4" placeholder="Text that will appear on hyperlink" name="linkDescription"  />
                        <span className="font-sans text-2xl pt-4 pb-2" >Upload your Main Photo</span>
                        <Upload name={"mainPhoto"} sendPhotoString={handleMainPhoto} title={"Main Photo"} />
                        {input.map((ipt, idx) => {
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