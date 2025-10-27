import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";
import Booked from "./pages/Booked";
const RoomsManagement =  lazy(()=> import("./adminPages/RoomsManagement"));
const  BookingSection = lazy(()=> import("./pages/BookingSection"))
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Home = lazy(() => import("./pages/Home"));
const Booking = lazy(() => import("./pages/Rooms"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const Contact = lazy(() => import("./pages/Contact"));
const Hotelrooms = lazy(() => import("./adminPages/Hotelrooms"));


function App() {
  return (
    <div>
      <BrowserRouter>

        <Suspense fallback={<Loading/>}>
          <Routes>
            {/* Unprotected Routes */}
            <Route path="/" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

            {/* Protected Routes */}
            <Route path="/booked" element={<Booked />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rooms" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rooms/roomsBooking" element={<BookingSection/>} />
            <Route path="/home/admin" element={<AdminAuth/>}/> 
            {/* components for admin user */}
            <Route path="/home/admin/adminpage" element={<AdminPage/>}/> 
            <Route path="/home/admin/adminpage/hotelrooms" element={<Hotelrooms/>}/>
            <Route path="/home/admin/adminpage/management" element={<RoomsManagement/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
