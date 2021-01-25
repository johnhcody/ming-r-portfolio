import React, { useState } from 'react'

export default function MultipleUpload() {

    const [link, setLink] = useState({string: '' });
    const [loading, setLoading] = useState(false);

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
            setLink({string: `https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/${filename}`})
            setLoading(false);
        } else {
            console.error('Upload failed.');
            document.getElementById('instructions').innerText = "It looks like there was a problem...try refreshing the page"
            setLoading(false);
        }
    };

    return (
        <div className="upload-wrapper">
            <p id="instructions">Upload a .png or .jpg image (max 1MB).</p>
            <input
                onChange={uploadPhoto}
                type="file"
                title=" "
                accept="image/png, image/jpeg"
            />
            {link.string !== '' ? <h2 >Image can be found at: <a id="aws-link">{link.string}</a></h2> : null}
            {loading ? <div className="loader"></div> : null}
        </div>
    );
}