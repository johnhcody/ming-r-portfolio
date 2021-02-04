import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
import React, { useEffect, useContext } from 'react'
import { useLanguage, useLanguageUpdate } from '../../context/languageContext'

interface Props {

}


export const LanguageToggle = (props: Props) => {

    const engLang = useLanguage();
    const toggleLang = useLanguageUpdate();

    useEffect(() => {
        let cb = document.getElementById('language-toggle-switch') as HTMLInputElement
        if (engLang) {
            cb.checked = false;
        } else {
            cb.checked = false;
        }
    }) 


    return (
        <div className="toggle-wrapper">
            <input type="checkbox" id="language-toggle-switch" onClick={toggleLang}/>
        </div>
    )
}