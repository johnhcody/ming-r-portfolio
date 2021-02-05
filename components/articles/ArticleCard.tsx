import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useGetUser } from '../../actions/user'
import { useRouter } from 'next/router';
import axios from 'axios';

interface Props {
    article: {
        title: string;
        intro: string;
        type: string;
        description: string;
        paragraphs: number[];
        photos: number[];
        order: number[];
        linkUrl: string;
        linkDescription: string;
        mainPhoto: string;
        _id: string;
    }
}


const ArticleCard: React.FC<Props> = props => {

    const { article } = props;
    const [hover, setHover] = useState(false)
    const {data, loading} = useGetUser();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
    }

    useEffect(() => {
        if (isDeleting) {
            deleteArticle();
        }
    }, [isDeleting])

    const deleteArticle = async () => {
        const deleted = await axios.delete(`/api/projects/${article._id}`)
        router.push('/');
    }

    const truncatedText = article.intro.slice(0,75) + "..."
                return (
                    <div className="card-wrapper">
                        <div className="img-wrapper" >
                            <Link href={`/projects/${article._id}`}>
                                <div className="hidden-text-wrapper" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                    <img src={article.mainPhoto == "" ? 'https://ming-portfolio-uploads.s3.ap-northeast-2.amazonaws.com/Mingkwan-Alt.png' : article.mainPhoto} alt="" />
                                    <div className="inside">
                                        {hover ? <p>View Post</p>: null}
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <h1>{article.title}</h1>
                        <h2 >{truncatedText}</h2>
                        <a href={`${article.linkUrl}`} target="_blank">{article.linkDescription}</a>
                        <div className="idx-itm-btn-wrapper">
                            {data && data.name == "john.haner.cody@gmail.com" ? <><Link href={`/projects/${article._id}/edit`}>
                                <button>Edit</button>
                            </Link><button onClick={handleDelete}>Delete</button></> : null}
                            
                        </div>

                    </div>
                )
}

export default ArticleCard;