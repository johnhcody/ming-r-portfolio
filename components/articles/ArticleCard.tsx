import React, { useState } from 'react'
import Link from 'next/link'
import { useGetUser } from '../../actions/user'


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
                        <h2>{article.intro}</h2>
                        <a href={`${article.linkUrl}`} target="_blank">{article.linkDescription}</a>
                        <div className="idx-itm-btn-wrapper">
                            {data && data.name == "john.haner.cody@gmail.com" ? <Link href={`/projects/${article._id}/edit`}>
                                <button>Edit</button>
                            </Link> : null}
                            
                        </div>

                    </div>
                )
}

export default ArticleCard;