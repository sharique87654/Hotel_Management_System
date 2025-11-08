import logo from "../assets/main_logo.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

export default function Contact() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "51021e0c-652a-4c89-a2d2-2bf937c282d4");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Message Sent!",
        showConfirmButton: false,
        timer: 2500,
      });
      event.target.reset();
    } else {
      //("Error", data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Please try again later.",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-h-screen text-white overflow-x-hidden">
      <Navbar />

      <div className="flex flex-col md:flex-row justify-center items-center px-10 md:px-32 py-24 space-y-16 md:space-y-0 md:space-x-20">
        {/* Left Info Section */}
        <div className="max-w-xl text-center md:text-left animate-fadeIn">
          <img
            src={logo}
            alt="logo"
            className="h-48 w-96 mx-auto md:mx-0 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
          <h1 className="font-bold text-5xl mt-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">
            We’re Here to Help
          </h1>
          <p className="font-medium text-gray-300 mt-6 leading-relaxed tracking-wide">
            We’re here to assist you in every step of your stay at{" "}
            <span className="font-semibold text-amber-400">Byte Hotel</span>.
            Whether you have questions about room availability, booking
            inquiries, or special requests, our team is ready to make your
            experience smooth and enjoyable. Simply fill out the form below, and
            we’ll get back to you promptly.
          </p>
        </div>

        {/* Contact Form */}
        <form
          className="bg-gradient-to-br from-gray-800/70 via-gray-900/60 to-black/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md animate-slideUp"
          onSubmit={onSubmit}
        >
          {/* name input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 text-white focus:outline-none focus:ring-0 focus:border-amber-500 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-amber-500 peer-focus:scale-75 peer-focus:-translate-y-6">
              Full Name
            </label>
          </div>

          {/* email input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 text-white focus:outline-none focus:ring-0 focus:border-amber-500 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-amber-500 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
          </div>

          {/* phone number input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              className="appearance-none block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 text-white focus:outline-none focus:ring-0 focus:border-amber-500 peer"
              placeholder=" "
              style={{
                MozAppearance: "textfield", // removes arrows in Firefox
                WebkitAppearance: "none", // removes arrows in Chrome, Safari, Edge
                margin: 0, // optional: prevents layout shift
              }}
              onWheel={(e) => e.target.blur()} // optional: disables scroll value change
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-amber-500 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone Number (Optional)
            </label>
          </div>

          {/* subject input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="subject"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 text-white focus:outline-none focus:ring-0 focus:border-amber-500 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-amber-500 peer-focus:scale-75 peer-focus:-translate-y-6">
              Subject
            </label>
          </div>

          {/* message input */}
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-gray-400">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              className="block p-3 w-full text-sm bg-gray-900/70 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              placeholder="Leave a message or any issue..."
              required
            ></textarea>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-amber-500/30 hover:scale-105 transition-transform duration-300 focus:ring-4 focus:ring-amber-400/30"
          >
            Send Message ✉️
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
