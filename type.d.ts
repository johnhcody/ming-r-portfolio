interface IArticle {
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
}

type ContextType = {
    articles: IArticle[]
    // saveArticle: (article: IArticle) => void
    // updateArticle: (id: number) => void
}