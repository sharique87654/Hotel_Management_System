import video1 from "../assets/seeview.mp4"
import video2 from "../assets/room.mp4"
import video3 from "../assets/food.mp4"
export default function VideoSection() {
  return (
    <div>
      <br />
      <center><h1 className="font-bold text-4xl"><span className="text-amber-700">Everything You Need for a Perfect Stay</span></h1></center>
      <br />
      <hr className="border-none h-[4px] w-[73rem] ml-[21.75rem] bg-gray-800"/>

      <br />

      <div className=" flex bg-gray-200  h-[24rem] w-auto mt-10 ">
        <br />
        <br />
          <div className=" rounded ml-[12.5rem] mt-12 ">
          <video width="520px" height="240px" autoPlay muted loop className="rounded-2xl">
          <source src={video1}></source>
        </video>
          </div>
          <div className="flex float-right h-60 w-[55rem] text-center items-center ml-[12rem] mt-20">
          <p className="font-semibold text-xl">Our location provides easy access to key attractions, business districts, and transportation hubs, making Byte Hotel the perfect destination for all types of travelers. The serene ambiance, paired with our commitment to sustainability and eco-friendly practices, makes every stay with us unique.we take pride in offering world-class hospitality with a tech-savvy touch. Enjoy seamless check-ins and room service with our digital concierge, ensuring your stay is hassle-free. Relax in our rooftop infinity pool with stunning skyline views, indulge in gourmet meals at our in-house restaurant, or unwind at our state-of-the-art fitness center.</p>
          </div>
      </div>


      
      <div className=" flex bg-gray-300  h-[24rem] w-auto mt-10 ">
        <br />
        <br />
          <div className="flex float-right h-60 w-[55rem] text-center items-center ml-[11rem] mt-20">
          <p className="font-semibold text-xl">Our beautifully designed rooms are a fusion of modern aesthetics and timeless elegance, equipped with smart controls, high-speed internet, and premium amenities. Whether you’re here for business or leisure, we’ve tailored every detail to exceed your expectations.we take pride in offering world-class hospitality with a tech-savvy touch. Enjoy seamless check-ins and room service with our digital concierge, ensuring your stay is hassle-free. Relax in our rooftop infinity pool with stunning skyline views, indulge in gourmet meals at our in-house restaurant, or unwind at our state-of-the-art fitness center.</p>
          </div>
          <div className=" rounded ml-48 mt-12 ">
          <video width="520px" height="240px" autoPlay muted loop className="rounded-2xl">
          <source src={video2}></source>
        </video>
          </div>
      </div>


      


      <div className=" flex bg-gray-300  h-[24rem] w-auto mt-10 ">
        <br />
        <br />
          <div className=" rounded ml-[12.5rem] mt-12 ">
          <video width="520px" height="240px" autoPlay muted loop className="rounded-2xl">
          <source src={video3}></source>
        </video>
          </div>
          <div className="flex float-right h-60 w-[55rem] text-center items-center ml-[12rem] mt-20">
          <p className="font-semibold text-xl">Our in-house restaurant offers a diverse menu prepared by world-class chefs. Whether you’re enjoying a hearty breakfast, a light lunch, or a fine dining dinner, we use the freshest ingredients to ensure every dish is a masterpiece. Room service is available around the clock for your convenience, allowing you to indulge in our exceptional culinary offerings from the comfort of your room. Vegetarian, vegan, and other dietary preferences are always accommodated with care. At Byte Hotel, every meal is an experience to savor</p>
          </div>
      </div>

      </div>

  )
}
