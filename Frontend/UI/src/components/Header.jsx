import headerImg from "../assets/homeImg2.jpg";
import { Navigate } from "react-router-dom";
export const Header = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  if (!isAuthenticated) {
    return <Navigate to="/Signin" replace />;
  }
  return (
    <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 text-white overflow-hidden">
      <div className="inset-y-0 top-0 right-0 z-0 w-auto max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-6/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-slate-900 transform -translate-x-1/2 lg:block opacity-80"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <img 
          className="object-cover w-full h-56 rounded-xl shadow-2xl lg:rounded-none lg:shadow-none md:h-96 lg:h-full brightness-90 hover:brightness-100 transition duration-500"
          src={headerImg}
          alt="header Image"
        />
      </div>

      <div className="relative flex flex-col items-start w-full max-w-xl px-6 mx-auto md:px-0 lg:px-12 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10">
          <h5 className="mb-3 font-sans text-lg md:text-xl font-medium text-sky-300 tracking-wide uppercase">
            Welcome to
          </h5>
          <h2 className="mb-6 font-sans text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 drop-shadow-md">
            Byte Hotel
          </h2>
          <p className="pr-5 mb-8 text-base md:text-lg text-slate-200 font-light leading-relaxed">
            We offer a futuristic and luxurious experience, ensuring every guest
            enjoys unmatched comfort, cutting-edge amenities, and exceptional
            service. Step into the future of hospitality and let us redefine
            your travel experience.
          </p>
          <div className="flex items-center">
            <a
              href="/home"
              className="inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 focus:ring-4 focus:ring-sky-400/40"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
