import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Need this for useTranslation to Run
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}

export default function Custom404() {
    const { t } = useTranslation('common');
    return (
      <div className="flex items-center justify-center w-full h-[100vh]">
        <div className="flex justify-center grid grid-rows">
          <p className="flex mt-5 mx-auto justify-center text-center w-[90%] text-2xl text-black-600 font-bold">{t('heading404')}!</p>
          <p className="flex mt-5 mx-auto justify-center text-center w-[90%] text-2xl text-black-600">{t('line1404')}</p>
          <p className="flex mt-5 mx-auto text-center justify-center w-[90%] text-2xl text-black-600">{t('line2404')}</p>
          <Link href='/' aria-label="myMind"  className="p-4 justify-center mx-auto">
            <Image 
              src={"/Images/logo.png"}
              alt={"MyMind Logo"}
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>
      </div>
    )

  }