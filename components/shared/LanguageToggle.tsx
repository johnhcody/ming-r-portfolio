import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
import React, { useEffect, useContext } from 'react'
import { useLanguage, useLanguageUpdate } from '../../context/languageContext'

interface Props {

}


export const LanguageToggle = (props: Props) => {

    const engLang = useLanguage();
    const toggleLang = useLanguageUpdate();

    useEffect(() => {
        if (engLang) {
            document.getElementById('language-toggle-switch').checked = false;
        } else {
            document.getElementById('language-toggle-switch').checked = true;
        }
    }) 


    return (
        <div className="toggle-wrapper">
            <input type="checkbox" id="language-toggle-switch" onClick={toggleLang}/>
        </div>
    )
}