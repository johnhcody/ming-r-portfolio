import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app'
import '../styles/application.scss'
import { LanguageProvider } from '../context/languageContext'

function App({ Component, pageProps }: AppProps) {
    return <LanguageProvider><Component {...pageProps} /></LanguageProvider>
}

export default App
