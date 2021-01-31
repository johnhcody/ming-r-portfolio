import React, { useState } from 'react'
import Link from 'next/link'
import { useGetUser } from '../../actions/user'


interface Props {
    article: Object
}


export const ArticleCard = (props: Props) => {

    const { article } = props;
    const [hover, setHover] = useState(false)
    const {data, loading} = useGetUser();
    debugger
                return (
                    <div className="card-wrapper">
                        <div className="img-wrapper" >
                            <Link href={`/articles/${article._id}`}>
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
                        <a href={`${article.link}`} target="_blank">Check out the source</a>
                        <div className="idx-itm-btn-wrapper">
                            {data && data.name == "john.haner.cody@gmail.com" ? <Link href={`/${article._id}/edit`}>
                                <button>Edit</button>
                            </Link> : null}
                            
                        </div>

                    </div>
                )

    
}