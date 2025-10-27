import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function BookingSection() {
    const location = useLocation();
    const { roomName, noOfBed, description, price } = location.state; // we can do "const room = location.state.roomName " 
    const navigate = useNavigate();

    return (
        <div><div className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Side: Hotel Info  */}

        <div>
        <img src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hotel Image" className="rounded-lg w-full h-80 object-cover"/>
        
        <h2 className="text-4xl font-bold mt-4">{roomName}</h2>
        <div className="flex space-x-4 mt-4">
            <div className="bg-gray-200 p-4 rounded-md">
            <i className="fas fa-bed text-2xl"></i>
            <p className="mt-2 font-semibold">Number of BedRooms: {noOfBed} </p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
            <i className="fas fa-city text-2xl"></i>
            <p className="mt-2 font-semibold">King-sized bed</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
            <i className="fas fa-coffee text-2xl"></i>
            <p className="mt-2 font-semibold">Flat-Screen TV</p>
            </div>
        </div>
    
        <h3 className="text-2xl font-bold mt-8 ">Description</h3>
        <p className="text-gray-600 mt-2 font-semibold">
            {description}
        </p>
    
        <h3 className="text-2xl font-bold mt-8">In-Room Facilities</h3>
        <div className="flex space-x-4 mt-4">
            <div className="bg-gray-200 p-4 rounded-md">
            <i className="fas fa-bed text-2xl"></i>
            <p className="mt-2 font-semibold">Wi-Fi Access</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
            <i className="fas fa-bed text-2xl"></i>
            <p className="mt-2 font-semibold">Sea View</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
            <i className="fas fa-bed text-2xl"></i>
            <p className="mt-2 font-semibold">Coffee/Tea Maker</p>
            </div>
                <div className="bg-gray-200 p-4 rounded-md">
                <i className="fas fa-bed text-2xl"></i>
                <p className="mt-2 font-semibold">Soundproof Windows</p>
                </div>
        </div>
            <div className="flex space-x-4 mt-4">
                <div className="bg-gray-200 p-4 rounded-md">
                <i className="fas fa-bed text-2xl"></i>
                <p className="mt-2 font-semibold">Private Balcony</p>
                </div>
                <div className="bg-gray-200 p-4 rounded-md">
                <i className="fas fa-bed text-2xl"></i>
                <p className="mt-2 font-semibold">Telephone with International Calling</p>
                </div>
                <div className="bg-gray-200 p-4 rounded-md">
                <i className="fas fa-bed text-2xl"></i>
                <p className="mt-2 font-semibold">Minibar / Refrigerator</p>
                </div>
            </div>
        </div>
    
        {/* Right Side: Booking Section  */}

        <div className="bg-white shadow-md rounded-lg p-24 h-[30rem] w-[45rem] ml-[6.25rem] mt-[7.5rem]">
        <div className="text-lg font-bold mb-4">
            <span className="line-through font-semibold text-2xl">$12,999</span>
            <span className="text-green-600 font-semibold text-2xl"> | discount 10%. Now <span className="text-amber-600 font-semibold text-2xl">{price}</span></span>
        </div>
        <p className="text-sm text-gray-600 mb-4 font-semibold">
            Check-in time is 12:00 PM, checkout time is 11:59 AM. If you leave behind any items...
        </p>
    
        {/* Form Section  */}

        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
            <label className="block text-sm text-gray-700 font-semibold">Check In date</label>
            <input type="date" className="w-full p-2 border rounded-md"/>
            </div>
            <div>
            <label className="block text-sm text-gray-700 font-semibold">Check Out date</label>
            <input type="date" className="w-full p-2 border rounded-md"/>
            </div>
        </div>
    
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
            <label className="block text-sm text-gray-700 font-semibold">Adults</label>
            <input type="number" min="1" value="1" className="w-full p-2 border rounded-md"/>
            </div>
            <div>
            <label className="block text-sm text-gray-700 font-semibold">Children</label>
            <input type="number" min="0" value="0" className="w-full p-2 border rounded-md"/>
            </div>
        </div>

        <button onClick={() => navigate("/booked")} className="bg-green-600 text-white w-full py-3 rounded-md hover:bg-green-700 font-bold text-xl">
            Book Now
        </button>
        </div>
    </div>
    </div>
    )
}
