import React, { useState } from 'react'

export const ArticleContext = React.createContext(null);

const ArticleProvider: React.FC = ({ children }) => {
    const [articles, setArticles] = useState<IArticle[]>()
}