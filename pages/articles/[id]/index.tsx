import React from 'react'
import { NextPage } from 'next';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BaseLayout from '../../../components/layouts/BaseLayout';
import Link from 'next/link';
import { Footer } from '../../../components/shared/Footer'
import { useGetUser } from '../../../actions/user'

interface Props {
    article: {
        title: string;
        intro: string;
        description: string;
        body1: string;
        body2: string;
        body3: string;
        body4: string;
        body5: string;
        mainPhoto: string;
        photo2: string;
        photo3: string;
        photo4: string;
        photo5: string;
        linkUrl: string;
        linkDescription: string;
        _id: string;
    };
}

const Article: NextPage<Props> = ({ article }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();


    useEffect(() => {
        if (isDeleting) {
            deleteArticle();
        }
    }, [isDeleting])

    const deleteArticle = async () => {
        const articleId = router.query.id;

        const deleted = await axios.delete(`/api/articles/${articleId}`)
        router.push('/');
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        
    }

    const { loading, data } = useGetUser();

    return (
        <>
        <BaseLayout data={data} loading={loading}>
            <div className="article-container">
                <h1>{article.title}</h1>
                    <img src={article.mainPhoto == "" ? 'https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/Mingkwan-Alt.png' : article.mainPhoto} alt="" />
                <h2>{article.intro}</h2>
                    <a href={`${article.linkUrl}`}>{article.linkDescription}</a>
                <p>{article.description}</p>
                
                <p>{article.body1}</p>
                <img src={article.photo2}></img>
                
                <p>{article.body2}</p>
                <img src={article.photo3}></img>
                
                <p>{article.body3}</p>
                <img src={article.photo4}></img>

                <p>{article.body4}</p>
                <img src={article.photo5}></img>

                <p>{article.body5}</p>
                { data && data.name == "john.haner.cody@gmail.com" ? 
                    <div className="idx-itm-btn-wrapper">
                        <Link href={`/articles/${article._id}/edit`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={handleDelete}>Delete</button>
                    </div> : null
                }
            </div>
        </BaseLayout>
        <Footer />
        </>
    )

}

Article.getInitialProps = async ({ query: { id }}) => {
    const res = await axios.get(`/api/articles/${id}`)
    const data = res.data['data'];

    return { article: data }
}

export default Article;