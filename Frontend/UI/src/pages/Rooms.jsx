import { Suspense, lazy, useEffect, useState  } from "react";
const Cards = lazy(() => import("../components/cards"));
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
import Loading from "../components/Loading";
import axios from 'axios'

export default function Booking() {
  const [data , setdata] = useState([])
  useEffect(()=>{
      axios.get('http://localhost:3000/HotelApi/rooms')
      .then((response)=>{
          setdata(response.data)
      })
  }, [])

  return (
    <div className="bg-slate-100">
      <Suspense fallback={<div><Loading/></div>}>
    <Navbar/>
    <div className="text-center mt-[7rem]">
    <h1 className="text-4xl font-bold ">Your Getaway Begins with a Click - <span className="text-amber-600">Book Now</span></h1>
    <br />
    <br />
    <hr className="border-none h-[2px] w-[73rem] ml-[21.75rem] bg-gray-800"/>
    </div>
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ml-16 mt-[8rem]">
      {data.map((element)=>(
        // if we use {} as block of function then we have to return components
        // if we use () as block of function then we don't have to  return components it will automatically return it
        <Cards key={element._id} roomName={element.roomName} description={element.description} roomType={element.roomType} price={element.price} noOfBed={element.numberofbed} />
      ))}
      
    </div>
    <br />
    <br />
    <Footer/>
    </Suspense>
    </div>
  )
}
