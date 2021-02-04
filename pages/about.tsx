import React, { useEffect, useState } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import Footer from '../components/shared/Footer'
import { useLanguage } from '../context/languageContext'
import { useGetUser } from '../actions/user'
import AboutParagraph from '../components/about/AboutParagraph'
import NavBar from '../components/shared/Navbar'




interface Props {

}

const About: React.FC<Props> = props => {


    const { loading, data } = useGetUser();

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

    const [ hidden, setHidden ] = useState(false);
    
    // useEffect(() => {
    //     window.addEventListener('resize', handleResize)
    // }, []);

    // const handleResize = () => {
    //     if (window.innerWidth <= 700) {
    //         setHidden(true);
    //     } else {
    //         setHidden(false)
    //     }
    // }

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

    const engLang = useLanguage();

    return (
        <>
            <BaseLayout data={data} loading={loading}>
                <div className="flex justify-center flex-col items-center">
                {engLang == true ? <h1 className="flex justify-center text-4xl font-sans pt-24 pb-12" >About Me</h1> : <h1 className="flex justify-center text-4xl font-sans pt-24 pb-12" >เกี่ยวกับฉัน</h1>}
                {scrolled && !isMobile? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
                <AboutParagraph />
                </div>
                <div className="h-28">

                </div>
            </BaseLayout>
            <Footer />
            </>
        )
}

export default About