interface IArticle {
    title: string;
    intro: string;
    img: string;
    link: string;
}

type ContextType = {
    articles: IArticle[]
    // saveArticle: (article: IArticle) => void
    // updateArticle: (id: number) => void
}