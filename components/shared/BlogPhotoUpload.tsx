import React, { useState } from 'react'

interface Props {
    photoNumber: string;
    sendPhotoStr: Function;
}


const BlogPhotoUpload: React.FC<Props> = ({ photoNumber, sendPhotoStr }) => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const uploadPhoto = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const filename = encodeURIComponent(file.name);
        const res = await fetch(`/api/upload-url?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();
        const formArray: [string, string|File][] = Object.entries({...fields, file});
        formArray.forEach(([key, value]) => {
            formData.append(key, value);
        });
        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (upload.ok) {
            console.log('Uploaded successfully!');
            sendPhotoStr(index, `https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/${filename}`)
            setLoading(false);
            setSuccess(true);
        } else {
            console.error('Upload failed.');
            setLoading(false);
        }
    };

    //check out num...why is there two dashes?
    const num = photoNumber.split('-')[1];
    const index = parseInt(num) - 1;

    if (success) {
        return (
            <>
            <div className="upload-wrapper">
                <p className="py-4 font-sans">Uploaded Successfully</p>
                <svg className="ml-3" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.2 120.2">
                <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="45.1" cy="45.1" r="42.1"/>
                <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="60.2,30.2 38.5,65.8 25.8,50.5 "/>
                </svg>
            </div>
            {/* <button onClick={handleDelete} className="focus:outline-none focus:ring focus:border-gray-300 bg-blue hover:bg-yellow-500 text-white font-bold py-2 px-4 m-2 rounded-full outline:none" >Delete Photo</button> */}
            </>
        )
    } else {
        return (
            <div className="flex w-full items-center justify-center bg-grey-lighter py-4">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue ">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 font-sans text-base leading-normal">Select a file</span>
                    <input 
                        onChange={uploadPhoto} 
                        title=" " 
                        type="file" 
                        accept="image/png, image/jpeg" 
                        className="hidden" />
                    {loading ? <div className="loader"></div> : null}
                </label>
            </div>
        );   
    }
}
    
export default BlogPhotoUpload;