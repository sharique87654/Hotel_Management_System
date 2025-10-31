import logo from "../assets/main_logo.png";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Signup() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        try {
            const response = await axios.post('http://localhost:3000/', {
                firstname,
                lastname,
                email,
                password
            });

            if (response.status === 200) {
                setMessage({ text: "User created successfully", type: "success" });
            }
        } catch (err) {
            if (err.response.status === 400) {
                setMessage({ text: "Invalid input", type: "error" });
            } else if (err.response.status === 409) {
                setMessage({ text: "User already exists", type: "error" });
            } else {
                setMessage({ text: "Network error or server not responding", type: "error" });
            }
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-800 h-screen">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* image of logo */}
                    <img alt="Your Company" src={logo} className="h-40 w-80 ml-8 mb-8 " />

                    {/* heading */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-300">
                        Create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* input for first name  */}
                        <div>
                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-white">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input id="firstname" name="firstname" type="text" placeholder="John" required
                                    onChange={(e) => setFirstname(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        {/* input for last name */}
                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-white">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input id="lastname" name="lastname" type="text" placeholder="Wick" required
                                    onChange={(e) => setLastname(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        {/* input for email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" placeholder="John@gmail.com" required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        {/* input for password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Password
                            </label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" placeholder="" required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:ml-4"  />
                            </div>
                        </div>

                        {/* submit button */}
                        <div>
                            <button type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign up
                            </button>
                        </div>
                    </form>

                    {/* display message */}
                            {message ? (
  <div
    className={`mt-4 p-4 rounded ${
      message.type === "success"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {message.text}
  </div>
) : null}


                    {/* last */}
                    <p className="mt-10 text-center text-sm text-gray-300">
                        Already have an account?<Link to={'/Signin'} className="text-blue-400"> Sign in</Link>
                        <br />
                        <br />
                        <Link to={'/admin'} className="text-blue-400"> Admin</Link>
                    </p>
                </div>
            </div>
        </>
 );
}