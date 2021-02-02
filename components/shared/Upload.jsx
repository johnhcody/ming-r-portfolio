import React, { useState } from 'react'

export default function Upload(props) {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const uploadPhoto = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const filename = encodeURIComponent(file.name);
        const res = await fetch(`/api/upload-url?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (upload.ok) {
            console.log('Uploaded successfully!');
            props.sendPhotoString(props.name, `https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/${filename}`)
            setLoading(false);
            setSuccess(true);
        } else {
            console.error('Upload failed.');
            document.getElementById('instructions').innerText = "It looks like there was a problem...try refreshing the page"
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="upload-wrapper">
                <p className="py-4">Uploaded Successfully</p>
                <svg className="ml-3" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.2 120.2">
                <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="45.1" cy="45.1" r="42.1"/>
                <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="60.2,30.2 38.5,65.8 25.8,50.5 "/>
                </svg>
            </div>
        )
    } else {
        return (
            // <div className="upload-wrapper">
            //     <p id="instructions">Upload a .png or .jpg image (max 1MB).</p>
            //     <p>{props.title}</p>
            //     <input
            //         onChange={uploadPhoto}
            //         type="file"
            //         title=" "
            //         accept="image/png, image/jpeg"
            //         name={`${props.name}`}
            //     />
            //     {loading ? <div className="loader"></div> : null}
            // </div>
            <div className="flex w-full items-center justify-center bg-grey-lighter py-4">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue ">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Select a file</span>
                    <input 
                        onChange={uploadPhoto} 
                        title=" " 
                        type="file" 
                        accept="image/png, image/jpeg" 
                        className="hidden" 
                        name={`${props.name}`}
                        />
                        {loading ? <div className="loader"></div> : null}
                </label>
            </div>
        );
    }

}