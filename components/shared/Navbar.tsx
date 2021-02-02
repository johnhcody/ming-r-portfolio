import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../context/languageContext'


interface Props {
    fixToTop: string;
}


const NavBar: React.FC<Props> = (props: Props) => {
    const engLang = useLanguage();
    if (engLang) {
        return (
            <nav className={`bg-white p-2 w-full ${props.fixToTop}`} >
                <div className="flex justify-around min-h-full items-center flex-row">
                    <Link
                    href="/about" ><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">About</a>
                    </Link>

                    <Link
                    href="/portfolio"><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">Articles</a>
                    </Link>

                    <Link
                    href="/portfolio"><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">Projects</a>
                    </Link>

                    <Link
                    href="/blog"><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">Blog</a>
                    </Link>

                    <Link
                    href="/cv"><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">Contact</a>
                    </Link>
                </div>
            </nav>
        )
    } else {
        return (
            <div className="navbar-wrapper">
                <Link
                    href="/about"><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">เกี่ยวกับมิ่งขวัญ</a>
                </Link>
                <Link
                    href="/portfolio"><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">บทความ</a>
                </Link>
                <Link
                    href="/portfolio"><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">โครงการ</a>
                </Link>
                <Link
                    href="/blog"><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">บล็อก</a>
                </Link>
                <Link
                    href="/cv"><a className="text-3xl py-2 my-2 px-4 hover:no-underline hover:bg-blue hover:text-white rounded-md">ติดต่อ</a>
                </Link>
            </div> 
        )
    }
}

export default NavBar;