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
                <p>Uploaded Successfully</p>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <circle class="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                <polyline class="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                </svg>
            </div>
        )
    } else {
        return (
            <div className="upload-wrapper">
                <p id="instructions">Upload a .png or .jpg image (max 1MB).</p>
                <p>This will be your {props.title}</p>
                <input
                    onChange={uploadPhoto}
                    type="file"
                    title=" "
                    accept="image/png, image/jpeg"
                    name={`${props.name}`}
                />
                {loading ? <div className="loader"></div> : null}
            </div>
        );
    }

}