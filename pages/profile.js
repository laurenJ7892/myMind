import { Inter } from '@next/font/google'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Rating from '@mui/material/Rating';
import Header from "../components/header"
import Footer from "../components/footer"
import { supabaseAdmin, supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"
import Modal from "../components/modal"


const inter = Inter({ subsets: ['latin'] })

export default function Profile() {
  const { user, setUser, session } = useUser()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const [submitted, setSubmitted] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviewDeleted, setReviewDeleted] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [passwordInput, setPasswordInput] = useState("password")
  
  const [accountTab, setAccountTab] = useState(true)
  const [passwordTab, setPasswordTab] = useState(false)
  const [reviewTab, setReviewTab] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')


  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [dbReviews, setdbReviews] = useState([])

  
  const handleSubmit = async (e) => {
    if (user && user.user_metadata) {
      e.preventDefault();
      
      const changedFName = firstName ? firstName : user.user_metadata?.first_name;
      const changedLName = lastName ? lastName : user.user_metadata?.last_name; 
      const changedEmail = email ? email : user.email;

      if (changedFName != user.user_metadata?.first_name || changedLName !=  user.user_metadata?.last_name || changedEmail != user.email) {
    
        const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
          user.id, {
          email: changedEmail, 
          user_metadata: {
            first_name: changedFName,
            last_name: changedLName,
          }
        });

        if (data.user) {
          setDisabled(true)
          setUser(data.user)
          setEmail('')
          setFirstName('')
          setLastName('')
          setSubmitted(true)
      
        } else {
          setError(error.message)
        }
      }
      else {
        setError("Please change at least one value")
      }
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('user_reviews')
      .insert({
        user_id: user.id,
        rating: rating,
        review: review,
        })
      .select()

      if (data && data[0]) {
        setdbReviews(data)
        setRating(data[0].rating)
        setReview(data[0].review)
        setDisabled(true)
        setReviewSubmitted(true)
      } else {
        setError(error.message)
      }
  }

  const handleReviewUpdate = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('user_reviews')
      .update({
        rating: rating,
        review: review,
        })
      .eq('user_id', user.id)
      .select()

      if (data) {
        setdbReviews(data)
        setDisabled(true)
        setReviewSubmitted(true)
      } else {
        setError(error.message)
      }
  }

  const handleReviewDelete = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from('user_reviews')
      .delete()
      .eq('user_id', user.id)

      if (error) {
        setError(error.message)
      } else {
        setdbReviews([])
        setRating(5)
        setReview('')
        setReviewDeleted(true)
      }
  }

  const toggleActive = () => {
    setError(null)
    setPasswordTab(false)
    setReviewTab(false)
    setAccountTab(true)
  }

  const togglePassword = () => {
    setError(null)
    setAccountTab(false)
    setReviewTab(false)
    setPasswordTab(true)
  }

  const toggleReview = () => {
    setError(null)
    setReviewTab(true)
    setPasswordTab(false)
    setAccountTab(false)
  }

  const toggleDisabled = (e) => {
    e.preventDefault()
    setDisabled(false)
  }

  const showPassword = () => {
    if (passwordInput === "password") {
      setPasswordInput("text")
    } else {
      setPasswordInput("password")
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password != passwordConfirm) {
      setError("Please review your passwords. They do not match! ")
      // return;
    }

    if (!(/(?=.*\d)/.test(password))){
      setError("Please make sure your password has at least one number character")
      // return;
    }

    if (!(/(?=.*\W)/.test(password))) {
      setError("Please make sure your password has at least one special character")
      // return;
    }

    if (!(/(?=.*[A-Z])/.test(password))) {
      setError("Please make sure your password has at least one uppercase character")
      // return;
    }

    if (!(/(?=.*[a-z])/.test(password))) {
      setError("Please make sure your password has at least one lowercase character")
      // return;
    }

    if (password == passwordConfirm && 
        (/(?=.*[a-z])/.test(password)) &&
        (/(?=.*[A-Z])/.test(password)) &&
        (/(?=.*\W)/.test(password)) && 
        (/(?=.*\d)/.test(password))
    ) {
      const { user, error } = await supabase.auth.update({password: password})

      if (user) {
        setUser(user)
        setPassword('')
        setPasswordConfirm('')
        setSubmitted(true)
      } else {
        setError(error.message)
      }
    }
  }

  const getReviews = async () => {
    const { data, error } = await supabase
        .from('user_reviews')
        .select()
        .eq('user_id', user.id)

    if (data && data[0]) {
      setRating(data[0].rating)
      setReview(data[0].review)
      setdbReviews(data)
    } else {
      setError(error)
    }
  }

   // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!session || Object.keys(session).length == 0) {
      Router.push('/dashboard')
    } else {
      getReviews()
    }
  }, [])

  return (
    <>
      <Header />
      {submitted ? (<Modal heading={"User Information updated"} text={"If you updated your email, it won't be visible until you confirm your email via email"}  />) : ''}
      {reviewSubmitted ? (<Modal heading={"Review received"} text={"Thank you for your review! It helps us improve the platform. Our team will review and approve to be published anonmyously."}  />) : ''}
      {reviewDeleted ? (<Modal heading={"Review deleted"} text={"Your review has been deleted"}  />) : ''}
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-2 mt-5 flex h-[70vh] w-[90%] mx-auto bg-blue-100">
          <div className="flex grid grid-rows mx-auto my-auto">
           <button className="bg-blue-800 text-white rounded-[20px] p-4 my-2 focus:bg-violet-700" onClick={toggleActive}>Account information</button>
           <button className="bg-blue-400 text-black rounded-[20px] p-4 my-2 focus:bg-violet-700 focus:text-white" onClick={togglePassword}>Change password</button>
           <button className="bg-blue-800 text-white rounded-[20px] p-4 my-2 focus:bg-violet-700 focus:text-white" onClick={toggleReview}>Review and Testimonials</button>
          </div>
          <div className={accountTab ? 'visible' : 'hidden'}>
            <form className="flex grid grid-rows items-center mx-auto w-[90%] md:w-[80%] text-xl font-medium">
              <h2 className="flex my-5 mx-2 justify-center text-2xl font-bold w-[100%] md:w-[80%]">Your account information</h2>
                <label className="mx-2  w-[100%]">First name</label>
                <input 
                  type="text"
                  required
                  placeholder={user.user_metadata?.first_name}
                  id="name"
                  name="name"
                  disabled={disabled}
                  className="p-3 text-cyan-800 border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-gray-800 focus:placeholder:text-transperant w-[100%] md:w-[80%] my-5 md:mt-0"
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                  value={firstName}
                />
                <label className="mx-2 w-[100%]">Last name</label>
                <input
                  type="text"
                  className="p-3 text-cyan-800 border-gray-400 border border-4 placeholder:text-gray-800 focus:placeholder:text-transperant w-[100%] md:w-[80%] my-5 md:mt-0 focus:border-cyan-800"
                  required
                  id="lastName"
                  name="lastName"
                  disabled={disabled}
                  placeholder={user.user_metadata?.last_name}
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                  value={lastName}
                  />
              <label className="mx-2 w-[100%]">Email</label>
                <input
                  type="email"
                  className="p-3 text-cyan-800 border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-gray-800 focus:placeholder:text-transperant w-[100%] md:w-[80%] my-5 md:mt-0"
                  required
                  id="email"
                  name="email"
                  disabled={disabled}
                  placeholder={user.email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  value={email}
                />
              {error ? <p>{error}</p> : ''}
              {disabled ?  
                <button
                    onClick={() => setDisabled(false)}
                    className="flex justify-center w-[80%] mx-5 md:mx-20 md:w-[50%] mt-10 bg-cyan-800 text-white p-4 rounded-[20px] disabled:bg-gray-400">
                    Edit
                </button> : 
                <button
                  onClick={handleSubmit}
                  disabled={!!submitted}
                  className="flex justify-center w-[80%] mx-5 md:mx-20 md:w-[50%] mt-10 bg-cyan-800 text-white p-4 rounded-[20px] disabled:bg-gray-400">
                  Update
                </button>
              }
            </form>
          </div>
          <div className={passwordTab ? 'visible' : 'hidden'}>
            <h2 className="flex items-center mt-5 mx-auto justify-center text-2xl font-bold w-[100%]">Change Password</h2>
            <form className="flex grid grid-rows items-center mx-auto w-[100%]"> 
              <label className="mx-5 w-[100%] text-2xl my-5">Password</label>
              <div className="flex">
                  <input
                    type={passwordInput}
                    className="py-5 ml-5 mr-1 text-cyan-800 border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800  w-[85%] md:w-[80%]"
                    required
                    id="password"
                    name="password"
                    minLength="6"
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    value={password}
                  />
                    <Image 
                      src={"/Images/eye-solid.svg"}
                      height={20}
                      width={20}
                      onClick={showPassword}
                      alt="show password"/>
                  </div>
                <label className="mx-5 w-[100%] my-5 text-2xl">Confirm Password</label>
                <div className="flex">
                <input 
                  type={passwordInput}
                  className="py-5 ml-5 mr-1 text-cyan-800 border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[85%] md:w-[80%]"
                  required
                  minLength="6"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value)
                  }}
                  value={passwordConfirm}
                />
                  <Image 
                    src={"/Images/eye-solid.svg"}
                    height={20}
                    width={20}
                    onClick={showPassword}
                    alt="show password"/>
                </div>
              {error ? <p>{error}</p> : ''}
              <button
                  disabled={password && password === passwordConfirm ? false : true}
                  onClick={handlePasswordChange}
                  className="flex justify-center mx-auto text-2xl w-[90%] md:w-[50%] mt-10 bg-cyan-800 text-white p-3 disabled:bg-gray-400 rounded-[20px]">
                  Change password
              </button>
            </form>
          </div>
          <div className={reviewTab ? 'visible' : 'hidden'}>
          <h2 className="flex items-center mt-5 mx-auto justify-center text-2xl font-bold w-[100%]">My Reviews</h2>
            {dbReviews && dbReviews.length == 0 ?
            <>
              <form className="flex grid grid-rows items-center mx-auto w-[100%]"> 
                <label className="mx-auto text-center w-[100%] text-2xl my-5 mt-10">Out of 5 stars, how would you rate myMind?</label>
                <div className="flex justify-center mx-auto">
                  <Rating
                    name="simple-controlled"
                    size="large"
                    value={rating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </div>
                <div className="mx-auto mt-10">
                <label className="flex justify-center mx-auto text-center text-lg w-[80%]">In 200 characters or less, please tell us why you like myMind or how it has helped you</label>
                  <textarea
                    className="flex p-2 mx-auto mt-5 justify-center text-cyan-800 border-gray-400 border border-4 placeholder:text-gray-800 focus:placeholder:text-transperant w-[100%] md:w-[80%] h-[10vh] my-5 md:mt-10 focus:border-cyan-800"
                    required
                    maxLength={200}
                    id="review"
                    name="review"
                    onChange={(e) => {
                      setReview(e.target.value)
                    }}
                    value={review}
                    />
                </div>
                {error ? <p>{error}</p> : ''}
                <button
                    disabled={rating && review ? false : true}
                    onClick={handleReviewSubmit}
                    className="flex justify-center mx-auto text-2xl w-[90%] md:w-[50%] mt-10 bg-cyan-800 text-white p-3 disabled:bg-gray-400 rounded-[20px]">
                    Submit review
                </button>
              </form>
            </> : 
            <>
              <form className="flex grid grid-rows items-center mx-auto w-[100%]"> 
                  <label className="mx-auto text-center w-[100%] text-2xl my-5 mt-10">Out of 5 stars, how did you rate myMind?</label>
                  <div className="flex justify-center mx-auto">
                    <Rating
                      name="simple-controlled"
                      size="large"
                      value={rating}
                      disabled={disabled}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                    />
                  </div>
                  <div className="mx-auto mt-10">
                  <label className="flex justify-center mx-auto text-center text-lg w-[80%]">Why you like myMind or how it has helped you</label>
                    <textarea
                      className="flex p-2 mx-auto mt-5 justify-center text-cyan-800 border-gray-400 border border-4 placeholder:text-gray-800 focus:placeholder:text-transperant w-[100%] md:w-[80%] h-[10vh] my-5 md:mt-10 focus:border-cyan-800"
                      required
                      maxLength={200}
                      disabled={disabled}
                      id="review"
                      name="review"
                      onChange={(e) => {
                        setReview(e.target.value)
                      }}
                      value={review}
                      />
                  </div>
                 {disabled ? 
                  <button
                      onClick={toggleDisabled}
                      className="flex justify-center mx-auto text-2xl w-[90%] md:w-[50%] mt-10 bg-cyan-800 text-white p-3 disabled:bg-gray-400 rounded-[20px]">
                      Edit Review
                  </button>
                  :
                  <>
                  <button
                      onClick={handleReviewUpdate}
                      className="flex justify-center mx-auto text-2xl w-[90%] md:w-[50%] mt-10 bg-cyan-800 text-white p-3 disabled:bg-gray-400 rounded-[20px]">
                      Update Review
                  </button>
                  <button
                      onClick={handleReviewDelete}
                      className="flex justify-center mx-auto text-2xl w-[90%] md:w-[50%] mt-10 bg-cyan-400 text-black p-3 disabled:bg-gray-400 rounded-[20px]">
                      Delete Review
                  </button>
                  </>
                  }
              </form>
            </>
            }
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
