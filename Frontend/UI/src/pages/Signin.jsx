import logo from "../assets/main_logo.png";
import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




export default function Signin() {
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')
    const [message , setMessage] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        try {
            const response = await axios.post("http://localhost:4000/signin", {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem("Token",response.data.token);
                navigate('/home')
            }
        } catch (error) {
                if (error.response.status === 411) {
                    setMessage({text : "Wrong input" , type : "error"})
                } else if (error.response.status === 401) {
                    setMessage({text : "Unauthorized user. Please go to the signup page"})
                } else {
                    setMessage({text : "An unexpected error occurred"})
                }
            }
        }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  bg-slate-800 h-screen">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                {/* image of logo */}

            <img alt="Your Company" src={logo} className="h-40 w-80 ml-8 mb-8" />

            {/* heading */}

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-300">
                Sign in to your account
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                {/* form */}

            <form className="space-y-6" onSubmit={handleSubmit}>

                {/* input for email */}
                <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white" >
                    Email address
                </label>
                <div className="mt-2">
                    <input id="email" name="email" type="email" placeholder=" John@gmail.com" required autoComplete="email" onChange={(e) => {
                        setemail(e.target.value)
                    }} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                </div>

                    {/* input for password */}
                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white" >
                    Password
                    </label>
                    <div className="text-sm">
                    <a href="#" className="font-semibold text-blue-400 hover:text-indigo-400" >
                        Forgot password?
                    </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input id="password" name="password" type="password" placeholder=" ******" required autoComplete="current-password" onChange={(e) => {
                        setpassword(e.target.value)
                    }} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                </div>

                    {/* submit button */}
                <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"  >
                    Sign in
                </button>
                </div>
            </form>

            {/* display message */}

            {message ? (
                <div className="mt-4 p-4 rounded  bg-red-100 text-red-700">
                    {message.text}
                </div>
            ) : null}


                {/* last  */}
            <p className="mt-10 text-center text-sm text-gray-300">
                Dont have account?<Link to={'/'} className="text-blue-400 hover:text-indigo-400" > Sign up </Link>
            </p>
            </div>
        </div>
        </>
    );
}
