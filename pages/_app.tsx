import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app'
import '../styles/application.scss'
import "tailwindcss/tailwind.css"
import { LanguageProvider } from '../context/languageContext'
import { PhotoProvider } from '../context/photoContext'

function App({ Component, pageProps }: AppProps) {
    return  <LanguageProvider>
                <PhotoProvider>
                    <Component {...pageProps} />
                </PhotoProvider>
            </LanguageProvider>
}

export default App
