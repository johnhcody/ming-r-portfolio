import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage, useLanguageUpdate } from '../../context/languageContext'


interface Props {

}


export const NavBar = (props: Props) => {
    const engLang = useLanguage();
    if (engLang) {
        return (
            <div className="navbar-wrapper">
                <Link
                href="/about">
                About
                </Link>
                <Link
                href="/portfolio">
                Articles
                </Link>
                <Link
                href="/portfolio">
                Projects
                </Link>
                <Link
                href="/portfolio">
                Blog
                </Link>
                <Link
                href="/cv">
                Contact
                </Link>
            </div>
        )
    } else {
        return (
            <div className="navbar-wrapper">
                <Link
                    href="/about">
                    เกี่ยวกับมิ่งขวัญ
                </Link>
                <Link
                    href="/portfolio">
                    บทความ
                </Link>
                <Link
                    href="/portfolio">
                    โครงการ
                </Link>
                <Link
                    href="/portfolio">
                    บล็อก
                </Link>
                <Link
                    href="/cv">
                    ติดต่อ
                </Link>
            </div> 
        )
    }
}