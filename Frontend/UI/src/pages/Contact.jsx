import logo from "../assets/main_logo.png";
import Navbar from "../components/Navbar";
import Swal from 'sweetalert2'

export default function Contact() {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "51021e0c-652a-4c89-a2d2-2bf937c282d4");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Message Sent!",
        showConfirmButton: false,
        timer: 2500
      });
      event.target.reset();
    } else {
      console.log("Error", data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: 'Please try again later.'
      });
    }
  };

  return (
    <div className="bg-gray-900 h-screen">
      <Navbar/>
      <div className="flex justify-center items-center mb-72  h-[52rem]">

<div className="mt-48 mb-56">
  <div className="w-[600px]">
    <img src={logo} alt="logo" className="h-48 w-96"/>
    <br />
    <h1 className="font-bold text-5xl  text-amber-600">We’re Here to Help</h1>
    <br />
    <p className="font-medium text-white">We’re here to assist you in every step of your stay at Byte Hotel. Whether you have questions about room availability, booking inquiries, or special requests, feel free to reach out to us. Our dedicated team is committed to making your experience with us as smooth and enjoyable as possible. Simply fill out the form below, and we’ll get back to you promptly.</p>
  </div>
</div>
<form className=" w-[30rem] mt-64  ml-80 mb-56" onSubmit={onSubmit}>

  {/* name input */}

  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="name"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
  </div>

      {/* email input */}

  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
  </div>


        {/* phone number input */}

  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="number" name="number" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number (Optional)</label>
    </div>
  </div>
  
      {/* subject input */}

  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="subject" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Subject</label>
  </div>
        {/* message input */}

<div className="relative z-0 w-full mb-5 group">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Message</label>
  <textarea name="message" rows="4" className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-600  dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white placeholder:font-medium" placeholder="Leave a Message or any kind of issue..." required></textarea>
</div>
<br />
      {/* submit button  */}
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
    </div>
  )
}
