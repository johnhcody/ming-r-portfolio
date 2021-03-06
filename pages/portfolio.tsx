import React, { useEffect, useState, useRef } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { NextPage } from 'next'
import axios from 'axios'
import Link from 'next/link';
import Footer from '../components/shared/Footer'
import ArticleCard from '../components/articles/ArticleCard'
import { useGetUser } from '../actions/user'
import NavBar from '../components/shared/Navbar'

interface PortfolioProps {
    articles: {
        title: string,
        intro: string,
        description: string,
        body1: string,
        body2: string,
        body3: string,
        body4: string,
        body5: string,
        mainPhoto: string,
        photo2: string,
        photo3: string,
        photo4: string,
        photo5: string,
        linkUrl: string,
        linkDescription: string,
        _id: string
    }[];
}

const Portfolio: NextPage<PortfolioProps> = props => {

    const [hover, setHover] = useState(false)
    const { loading, data } = useGetUser();
    const articles = Object.values(props).filter(el => el.type == "Article")
    
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

        return (
            <>
            <BaseLayout loading={loading} data={data}>
            {scrolled && !isMobile ? <NavBar fixToTop={'mt-0 fixed z-10 top-0'}/> : null}
            <div className="portfolio-wrapper">

                <div className="title-wrapper">
                    <h1>Welcome to my Portfolio</h1>
                </div>
                <div className="articles-wrapper">
                {articles.map(article => {
                    return (
                        <ArticleCard 
                            key={article._id}
                            article={article}
                            />
                    )
                })}

                </div>
                {
                    data && data.name == "john.haner.cody@gmail.com" ?
                    <div className="new-note pb-48">
                        <Link href={'/create-new'}>
                            <button className="">Create a new Article</button>
                        </Link>
                    </div> : null
                }
                

            </div>
            <div className="h-28"></div>

            </BaseLayout>
            <Footer />
            </>
        )
    
}


Portfolio.getInitialProps = async () => {
    // const res = await axios.get('localhost:3000/api/projects');
    const res = await axios.get('/api/projects/')
    const articles = res.data['data'];
    return articles;
}



export default Portfolio