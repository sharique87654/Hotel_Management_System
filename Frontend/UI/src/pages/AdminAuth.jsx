import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminAuth() {
    const [adminName , setadminName] = useState('')
    const [password , setpassword] = useState('')
    const [message , setMessage] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault() // Prevent form from refreshing the page
        try {
            const adimData = await axios.post('http://localhost:3000/admin/auth' , {
                adminName,
                password
            })
            if (adimData.status === 200){
                localStorage.setItem("AdminToken" , adimData.data.token)
                navigate('/home/admin/adminpage')
            }
        }
        catch (error) {
            if (error.response.status === 411) {
                setMessage({text : "Wrong input" , type : "error"})
            } else if (error.response.status === 401) {
                setMessage({text : "Unauthorized user. You are not Admin!"})
            } else {
                setMessage({text : "An unexpected error occurred"})
            }
        }
    }

    return (
    <div>
        <Navbar/>
<section className="bg-gray-50 dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Administrator Login Only</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">This Page is Only for Administrator</p>
            
        </div>
        <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Admin Login
                </h2>
                <form className="mt-8 space-y-6" action="#">

                        {/* first input value */}

                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin Username</label>
                        <input type="text" onChange={(e)=>{
                            setadminName(e.target.value)
                        }} name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Wick" required />
                    </div>

                        {/* secound input value */}

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin Password</label>
                        <input type="password" onChange={(e)=>{
                            setpassword(e.target.value)
                        }} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    {/* submit button */}

                    <button type="submit" onClick={handleSubmit} className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                </form>
                {message ? (
                <div className="mt-4 p-4 rounded  bg-red-100 text-red-700">
                    {message.text}
                </div>
            ) : null}
            </div>
        </div>
    </div>
</section>
</div>
  )
}
