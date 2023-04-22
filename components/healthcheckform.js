import Head from "next/head";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

export default function Form() {
  const router = useRouter();

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

    // validationSchema: Yup.object({
    //   name: Yup.string()
    //     .max(20, "Name must be 20 characters or less.")
    //     .required("Name is required"),
    //   email: Yup.string()
    //     .email("Invalid email address")
    //     .required("Email is required"),
    //   terms: Yup.array().required("Terms of service must be checked"),
    // }),

    onSubmit: (values) => {
      console.log("form submitted");
      console.log(values);
      router.push({ pathname: "/", query: values });
    },
  });

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute w-full"
    >

      <main className="  h-screen items-center flex justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white flex rounded-lg w-1/2 font-latoRegular"
        >
          <div className="flex-1 text-gray-700  p-20">
            <h1 className="text-3xl pb-2 font-">
              Lets do a health check! 👋
            </h1>
            <p className="text-lg  text-gray-500">
              This is based off the Australian Bureau of Statistics health data on mental and behavioral conditions by health risk factors and health status.
              https://www.abs.gov.au/statistics/health/health-conditions-and-risks/physical-activity/latest-release#data-downloads
              <Image
                src="/Images/ABS.png"
                alt="ABS"
                width={500}
                height={500}
                className="flex items-center m-auto"
                priority
              />

            </p>
            <p className="text-lg  text-gray-500">
              Submit your answers and they will be analysed against guidelines and ABS statistics
            </p>
            <div className="mt-6 ">


              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q1"
                  className="flex wrap block font- text-lg pb-2 max-w-lg "
                >
                  Question 1: How is your overrall health today?
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q1"
                  onChange={formik.handleChange}
                  value={formik.values.q1}
                >
                  <option value="">Great</option>
                  <option value="">Just okay</option>
                  <option value="">It could be better</option>
                </select>
              </div>
              {/* Question End */}


              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q2"
                  className="flex wrap block font- text-lg pb-2 max-w-lg "
                >
                  Question 2: How many serves of fruit do you eat daily
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q2"
                  onChange={formik.handleChange}
                  value={formik.values.q2}
                >
                  <option value="1">0</option>
                  <option value="2">1</option>
                  <option value="3">2</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q3"
                  className="flex wrap block font- text-lg pb-2 max-w-lg "
                >
                  Question 3: How many serves of vegetables do you eat Daily?
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q3"
                  onChange={formik.handleChange}
                  value={formik.values.q3}
                >
                  <option value={"1"}>0-3</option>
                  <option value={"2"}>4-6</option>
                  <option value={"3"}>6+</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q4"
                  className="flex wrap block font- text-lg pb-2 max-w-lg "
                >
                  Question 4: Do you regulary drink sugary drinks?
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q4"
                  onChange={formik.handleChange}
                  value={formik.values.q4}
                >
                  <option value="1">never</option>
                  <option value="2">sometimes</option>
                  <option value="3"></option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q5"
                  className="flex wrap block font- text-lg pb-2 max-w-lg "
                >
                  Question 5: Do you perform 150 minutes of physical activity per week?
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q5"
                  onChange={formik.handleChange}
                  value={formik.values.q5}
                >
                  <option value="1">not even close</option>
                  <option value="2">almost there</option>
                  <option value="3">yes and typically more!</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q6"
                  className="flex wrap block font- text-lg pb-2 max-w-lg "
                >
                  Question 6: Are you a smoker?
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q6"
                  onChange={formik.handleChange}
                  value={formik.values.q6}
                >
                  <option value="1">yes</option>
                  <option value="2">ex-smoker</option>
                  <option value="3">no</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q7"
                  className="flex wrap block font- text-lg pb-2 max-w-lg "
                >
                  Question 7: how much alcohol do you consumer weekly?
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q7"
                  onChange={formik.handleChange}
                  value={formik.values.q7}
                >
                  <option value="1">More than 10 drinks</option>
                  <option value="2">less than 5 a week</option>
                  <option value="3">Never or rarely</option>
                </select>
              </div>
              {/* Question End */}

              
              {/* Question start */}
              <div className="pb-4">
                <label
                  htmlFor="q8"
                  className="flex wrap block font- text-lg pb-2 max-w-lg "
                >
                  Question 8: Do you experience chronic body pains?
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
                  name="q8"
                  onChange={formik.handleChange}
                  value={formik.values.q8}
                >
                  <option value="1">Severe</option>
                  <option value="2">Mild</option>
                  <option value="3">None</option>
                </select>
              </div>
              {/* Question End */}

              
              </div>
              <button
                type="submit"
                className="bg-blue-500 font- text-sm text-white py-3 mt-6 rounded-lg w-full"
              >
                Submit
              </button>
            </div>

        </form>
      </main>
    </m.div>
  );
}


//     TEMPLATE
//     {/* Question start */}
//     <div className="pb-4">
//     <label
//       htmlFor="q1"
//       className="flex wrap block font- text-lg pb-2 max-w-lg "
//     >
//       Question 1:
//     </label>
//     <select
//       className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-blue-500 focus:ring-blue-500 w-full"
//       name="q1"
//       onChange={formik.handleChange}
//       value={formik.values.q1}
//     >
//       <option></option>
//       <option></option>
//       <option></option>
//     </select>
//   </div>
//   {/* Question start */}
    