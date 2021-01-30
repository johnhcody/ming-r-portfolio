import React, { useState } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'
import { NextPageContext } from 'next'
import axios from 'axios'
import articles from './api/articles'
import Link from 'next/link';
import { Footer } from '../components/shared/Footer'
import { ArticleCard } from '../components/ArticleCard'
import { useGetUser } from '../actions/user'

interface Props {

}
interface State {

}

const Portfolio = (props: Props) => {

    const [hover, setHover] = useState(false)
    const { loading, data } = useGetUser();
    const articles = Object.values(props).filter(el => typeof el.mainPhoto !== "undefined");
    debugger
        return (
            <>
            <BaseLayout loading={loading} data={data}>
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
                    <div className="new-note">
                        <Link href={'/new'}>
                            <button>Create a new Article</button>
                        </Link>
                    </div> : null
                }
                

            </div>

            </BaseLayout>
            <Footer />
            </>
        )
    
}


Portfolio.getInitialProps = async () => {
    const res = await axios.get('/api/articles');
    const articles = res.data['data'];
    //console.log(articles)
    return articles;
}



export default Portfolio