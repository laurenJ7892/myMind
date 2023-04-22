import Header from "../components/header"
import Footer from "../components/footer"
import Link from 'next/link'
import {Router, useRouter } from 'next/router'
 

export default function Results() {

const router = useRouter()

const {
  query: {q1, q2, q3, q4, q5, q6, q7, q8}
} = router

const props = [
  q1, q2, q3, q4, q5, q6, q7, q8
]
console.log(props)

const resultPrompts = {
  result0: "no answer selected",
  result1: "According to the ABS you could do better!",
  result2: "Great according to the ABS, you're getting there!",
  result3: "Good job you're above the ABS guidelines!"

}
const questionsResults = {
  q1: {text: "Question 1: How is your overral health today?", result: "test", guideline: "-"},
  q2: {text: "Question 2: How many serves of fruit do you eat daily", result: "", guideline: "2 Serves of fruit are recommended daily!"},
  q3: {text: "Question 3: How many serves of vegetables do you eat daily?", result: "", guideline: "6 Serves of fruit are recommended daily!"},
  q4: {text: "Question 4: Do you regulary drink sugary drinks?", result: "", guideline: "Adults and children should reduce their intake of sugar to less than 10% of their total daily energy intake. On average, this equals about 12 teaspoons (50 grams) of sugar per day for an adult."},
  q5: {text: "Question 5: Do you perform 150 minutes of physical activity per week?", result: "", guideline: "Be active on most (preferably all) days, to weekly total of: 2.5 to 5 hours of moderate activity"},
  q6: {text: "Question 6: Are you a smoker?", result: "", guideline: "Smoking any amount is not recommended"},
  q7: {text: "Question 7: How much alcohol do you consumer weekly?", result: "", guideline: "The Australian Guidelines recommend healthy adults should drink: a maximum of 10 standard drinks a week to cut the lifetime risk of harm from alcohol-related disease or injury"},
  q8: {text: "Question 8: Do you experience chronic body pains?", result: "", guideline: "If you experience any chronic pain you should see a health professional"}
}

// const questionsResults = [
//   {q1: {text: "Question 1: How is your overral health today?", result: "", guideline: ""}},
//   {q2: {text: "Question 2: How many serves of fruit do you eat daily", result: "", guideline: ""}},
//   {q3: {text: "Question 3: How many serves of vegetables do you eat daily?", result: "", guideline: ""}},
//   {q4: {text: "Question 4: Do you regulary drink sugary drinks?", result: "", guideline: ""}},
//   {q5: {text: "Question 5: Do you perform 150 minutes of physical activity per week?", result: "", guideline: ""}},
//   {q6: {text: "Question 6: Are you a smoker?", result: "", guideline: ""}},
//   {q7: {text: "Question 7: How much alcohol do you consumer weekly?", result: "", guideline: ""}},
//   {q8: {text: "Question 8: Do you experience chronic body pains?", result: "", guideline: ""}}
// ]

// const mapResult = () => {
//    questionsResults.forEach((element, index) =>{
    
//     if(props[element] == 0) {
//       questionsResults[index].result = resultPrompts[0]
//       //console.log(questionsResults.index.result)
//     }
//    })
// }

const resultText = (propNum) => {
  
  let returnText= ""
  
  if (props[propNum] == 0) {
    returnText = "no answer selected"
  }

  else if (props[propNum] == 1) {
    returnText = "According to the ABS you could do better!"
  }

  else if (props[propNum] == 2) {
    returnText = "Great according to the ABS, you're getting there!"
  }
  
  else if (props[propNum] == 3) {
    returnText = "Good job you're above the ABS guidelines!"
  }
  
  return returnText
}

// resultText(props.q1.valueOf)
// const matchEvalResults = () => {
//   for (const answer in props) {
//     if (answer.valueOf == 0) {
//       questionsResults.key.result = resultPrompts.result0
//     }
    
//     else if (answer.valueOf == 1) {
//       questionsResults.key.result = resultPrompts.result1
//     }

//     else if (answer.valueOf == 2) {
//       questionsResults.key.result = resultPrompts.result2
//     }

//     else if (answer.valueOf == 3) {
//       questionsResults.key.result = resultPrompts.result3
//     }
//   }
//   console.log("answers evaluted ")
//   console.log(questionsResults)
// }

// matchEvalResults()


  return (
    <>
      <Header />
      <main className="flex grid grid-rows w-full h-auto">
      <h2 className="flex items-center mx-auto text-2xl font-bold">health results</h2>
       <div className="flex grid grid-rows mt-5 flex h-[100%] md:h-[70vh] w-[90%] mx-auto bg-blue-100">
        <table class=" font-medium border-separate border-spacing-2 border border-slate-500" >
        <tbody >
          <tr>
            <th>Question</th>
            <th>Result</th>
            <th >Guideline suggestion</th>
          </tr>

          
         {/*} {questionsResults.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.text}</td>
                <td>{val.result}</td>
                <td>{val.guideline}</td>
              </tr>
            )
          })} */}
        
        {/** start row */}
          <tr>
          <td>{questionsResults.q1.text}</td>
          <td>{resultText(0)}</td>
          <td>{questionsResults.q1.guideline}</td>
        </tr> 
        {/** end row */}

         {/** start row */}
         <tr>
         <td className="max-w-sm">{questionsResults.q2.text}</td>
         <td >{resultText(1)}</td>
         <td className="max-w-md">{questionsResults.q2.guideline}</td>
       </tr> 
       {/** end row */}

        {/** start row */}
        <tr>
        <td>{questionsResults.q3.text}</td>
        <td>{resultText(2)}</td>
        <td className="max-w-md">{questionsResults.q3.guideline}</td>
      </tr> 
      {/** end row */}

       {/** start row */}
       <tr>
       <td className="max-w-sm">{questionsResults.q4.text}</td>
       <td>{resultText(3)}</td>
       <td className="max-w-md">{questionsResults.q4.guideline}</td>
     </tr> 
     {/** end row */}

      {/** start row */}
      <tr>
      <td className="max-w-sm">{questionsResults.q5.text}</td>
      <td>{resultText(4)}</td>
      <td className="max-w-md">{questionsResults.q5.guideline}</td>
    </tr> 
    {/** end row */}

     {/** start row */}
     <tr>
     <td className="max-w-sm">{questionsResults.q6.text}</td>
     <td>{resultText(5)}</td>
     <td className="max-w-md">{questionsResults.q6.guideline}</td>
   </tr> 
   {/** end row */}

    {/** start row */}
    <tr>
    <td className="max-w-sm">{questionsResults.q7.text}</td>
    <td>{resultText(6)}</td>
    <td className="max-w-md">{questionsResults.q7.guideline}</td>
  </tr> 
  {/** end row */}

   {/** start row */}
   <tr>
   <td className="max-w-sm">{questionsResults.q8.text}</td>
   <td>{resultText(7)}</td>
   <td className="max-w-md">{questionsResults.q8.guideline}</td>
 </tr> 
 {/** end row */}

        
        </tbody>
      </table>
        
        </div>
      </main>
      <Footer />
    </>
  )
}

