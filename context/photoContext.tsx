import React, { useContext, useState } from 'react'

const PhotoContext = React.createContext([]);
const PhotoUpdateContext = React.createContext(null);

export function usePhoto() {
    return useContext(PhotoContext);
}

export function usePhotoUpdate() {
    return useContext(PhotoUpdateContext);
}

export function PhotoProvider({ children }) {
    const [photoArr, setPhotoArr] = useState([])
    const [photoStr, setPhotoStr] = useState('')

    function addPhoto() {
        setPhotoArr(photoArr => photoArr.concat(photoStr));
    }

    return (
        <PhotoContext.Provider value={photoArr}>
            <PhotoUpdateContext.Provider value={addPhoto}>
                {children}
            </PhotoUpdateContext.Provider>
        </PhotoContext.Provider>
    )
}

export const PhotoConsumer = PhotoContext.Consumer;