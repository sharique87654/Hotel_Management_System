import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";
// import Booked from "./pages/Booked";
import AdminDashboard from "./adminPages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import MyBookings from "./pages/MyBookings";
import HotelBooked from "./pages/HotelBooked";
const RoomsManagement = lazy(() => import("./adminPages/RoomsManagement"));
const BookingSection = lazy(() => import("./pages/BookingSection"));
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
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Unprotected Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

            {/* <Route
              path="/rooms/booked"
              element={
                <PrivateRoute>
                  <Booked />
                </PrivateRoute>
              }
            /> */}

            {/* <Route path="" element={<Booked />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Booking />} />

            <Route path="/rooms/booked" element={<HotelBooked />} />
            <Route path="/mybookings" element={<MyBookings />} />
            <Route path="/signin" element={<Signin />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/rooms/roomsBooking" element={<BookingSection />} />
            <Route path="/home/admin" element={<AdminAuth />} />
            {/* components for admin user */}
            <Route path="/home/admin/adminpage" element={<AdminPage />} />
            <Route
              path="/home/admin/adminpage/hotelrooms"
              element={<Hotelrooms />}
            />
            <Route
              path="/home/admin/adminpage/management"
              element={<RoomsManagement />}
            />
            <Route
              path="/home/admin/adminpage/adminDashboard"
              element={<AdminDashboard />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
