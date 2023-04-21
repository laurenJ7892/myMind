import { Inter } from '@next/font/google'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Header from "../components/header"
import Footer from "../components/footer"


const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
        ])),
      },
    }
  }

export default function About() {
    const { t } = useTranslation('common');
    return (
        <>
            <Header />
            <main className="flex grid grid-rows w-full h-auto">
                <div className="flex grid grid-rows mt-5 flex h-[100%] md:h-[70vh] w-[90%] mx-auto bg-blue-100 padding-right: 20px; padding-left: 20px;">
                    <h2 className="flex items-center mx-auto text-2xl font-bold">{t('aboutUs')}</h2>
                    <p className="mx-auto w-[90%] mt-5">{t('aboutLine1')}
                        <br />
                        <p>{t('aboutLine2')}</p>
                        <br />
                        <p>{t('aboutLine3')}</p>
                        <br />
                        <p>{t('aboutLine4')}</p>
                    </p>
                    <Link href="/" aria-label="home">
                        <label className="flex text-cyan-800 justify-center text-xl">
                            <span className="underline ml-1">{t('home')}</span>
                        </label>
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    )
}

