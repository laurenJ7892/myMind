import { useFormik } from "formik";
import { useState} from "react";
import { useRouter,  } from "next/router";
import { useTranslation } from 'next-i18next'
import { motion as m } from "framer-motion";
import Image from 'next/image'
import { use } from "react";

export default function Form() {
  const router = useRouter()
  
  const [q1, setq1] = useState("")
  const [q2, setq2] = useState("")
  const [q3, setq3] = useState("")
  const [q4, setq4] = useState("")
  const [q5, setq5] = useState("")
  const [q6, setq6] = useState("")
  const [q7, setq7] = useState("")
  const [q8, setq8] = useState("")
 
  function sendProps() {
    router.push({
      pathname: "/healthresults",
      query: {
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8
      }
    })
  }

  const formik = useFormik({
    initialValues: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      
    },
  });

  
  const { t } = useTranslation('common');

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-full mb-5 h-[90%]"
    >

      <div className="flex justify-center grid grid-rows md:grid-cols w-full ">
        <form
          // onSubmit={formik.handleSubmit}
          className="bg-white flex rounded-lg w-[90%] md:w-[80%] font-latoRegular h-[80%]"
        >
          <div className="flex-1 text-gray-700 mx-auto">
            <h1 className="text-3xl">
              {t('healthCheckLine1')}👋
            </h1>
            <Image
              src="/Images/ABS.png"
              alt="ABS"
              width={100}
              height={100}
              className="py-5 flex items-center m-auto"
              priority
            />
          <p className="text-lg text-gray-500">
             {t('healthCheckLine3')}
            <a href= "https://www.abs.gov.au/statistics/health/health-conditions-and-risks/physical-activity/latest-release#data-downloads"> Link here (Table 4)</a>
            <p className="text-lg  text-gray-500 p-2">
           
            </p>
            <p className="text-lg  text-gray-500 p-2">
            {t('healthCheckLine2')}
          </p>
          </p>
            <div className="mt-6 ">


              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q1"
                  className="flex wrap block text-lg pb-2"
                >
                 {t('healthCheckQ1')}
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q1"
                  onChange={(e) => setq1(e.target.value)} 
                  //onChange={formik.handleChange}
                >
                  <option value="">{t('great')}</option>
                  <option value="">{t('ok')}</option>
                  <option value="">{t('improved')}</option>
                </select>
              </div>
              {/* Question End */}


              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q2"
                  className="flex wrap block font- text-lg pb-2"
                >
                 {t('healthCheckQ2')}
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q2"
                  onChange={(e) => setq2(e.target.value)} 
                  //onChange={formik.handleChange}
                >
                  <option value="1">{t('0')}</option>
                  <option value="2">{t('1')}</option>
                  <option value="3">{t('2')}</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q3"
                  className="flex wrap block text-lg pb-2 "
                >
                   {t('healthCheckQ3')}
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q3"
                  onChange={(e) => setq3(e.target.value)} 
                  //onChange={formik.handleChange}
                >
                  <option value={"1"}>{t('0-3')}</option>
                  <option value={"2"}>{t('4-6')}</option>
                  <option value={"3"}>{t('6+')}</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q4"
                  className="flex wrap block text-lg pb-2 "
                >
                 {t('healthCheckQ4')}
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q4"
                  onChange={(e) => setq4(e.target.value)} 
                >
                  <option value="1">{t('never')}</option>
                  <option value="2">{t('sometimes')}</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q5"
                  className="flex wrap block text-lg pb-2 "
                >
                 {t('healthCheckQ5')}
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q5"
                  onChange={(e) => setq5(e.target.value)} 
                  //onChange={formik.handleChange}
                >
                  <option value="1">{t('notClose')}</option>
                  <option value="2">{t('almost')}e</option>
                  <option value="3">{t('yesAnd')}</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q6"
                  className="flex wrap block text-lg pb-2"
                >
                   {t('healthCheckQ6')}
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q6"
                  onChange={(e) => setq6(e.target.value)} 
                  //onChange={formik.handleChange}
                >
                  <option value="1">{t('yes')}</option>
                  <option value="2">{t('smoker')}</option>
                  <option value="3">{t('no')}</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q7"
                  className="flex wrap block text-lg pb-2"
                >
                  {t('healthCheckQ7')}
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q7"
                  onChange={(e) => setq7(e.target.value)} 
                  //onChange={formik.handleChange}
                >
                  <option value="1">{t('10+')}</option>
                  <option value="2">{t('less5')}</option>
                  <option value="3">{t('neverRarely')}</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q8"
                  className="flex wrap block font- text-lg pb-2 max-w-lg "
                >
                  {t('healthCheckQ8')}
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q8"
                  onChange={(e) => setq8(e.target.value)} 
                  //onChange={formik.handleChange}
                >
                  <option value="1">{t('severe')}</option>
                  <option value="2">{t('mild')}</option>
                  <option value="3">{t('none')}</option>
                </select>
              </div>
              {/* Question End */}

              
              </div>
              <button
              onClick={sendProps}
                type="submit"
                className="bg-blue-500 text-sm text-white my-6 p-2 rounded-lg w-full"
              >
                 {t('submit')}
              </button>
            </div>
        </form>
      </div>
    </m.div>
  );
}

    