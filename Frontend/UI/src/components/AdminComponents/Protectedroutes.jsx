const Protectedroute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');  // Check if user is logged in

    // If the user is not authenticated, redirect to login
    if (!isAuthenticated) {

        return   <div className="bg-gray-900 flex flex-col items-center justify-center h-screen text-center">
        <h1 className="relative inline-block text-8xl font-bold text-white">
        </h1>
        <h2 className="text-8xl font-bold text-white mt-4">Get the hell out of here</h2>
        <br />
        <p className="text-lg text-gray-400 mt-2">You are not Admin.</p>
        <br />
        <a
          href="/home"
          className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700 transition duration-300"
        >
          Go Home
        </a>
      </div>
    }

    // If authenticated, render the children (protected content)
    return children;
};

export default Protectedroute;