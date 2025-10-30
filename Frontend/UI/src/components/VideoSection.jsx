import video1 from "../assets/seeview.mp4";
import video2 from "../assets/room.mp4";
import video3 from "../assets/food.mp4";
export default function VideoSection() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 text-white py-16">
      <center>
        <h1 className="font-extrabold text-5xl text-amber-500 tracking-wide drop-shadow-lg">
          Everything You Need for a Perfect Stay
        </h1>
        <div className="mt-6 mb-12 h-[4px] w-2/5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-lg"></div>
      </center>

      {/* Section 1 */}
      <div className="flex justify-center items-center bg-gray-800/60 backdrop-blur-md rounded-3xl mx-32 my-12 p-10 shadow-2xl hover:shadow-amber-500/30 transition-all duration-500">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <video
            width="520px"
            height="240px"
            autoPlay
            muted
            loop
            className="rounded-2xl hover:scale-105 transition-transform duration-700"
          >
            <source src={video1}></source>
          </video>
        </div>
        <div className="ml-16 text-lg leading-relaxed font-medium text-gray-200 tracking-wide">
          <p>
            Our location provides easy access to key attractions, business
            districts, and transportation hubs, making{" "}
            <span className="text-amber-400 font-semibold">Byte Hotel</span> the
            perfect destination for all types of travelers. The serene ambiance,
            paired with our commitment to sustainability and eco-friendly
            practices, makes every stay with us unique. We take pride in
            offering world-class hospitality with a tech-savvy touch. Enjoy
            seamless check-ins, relax in our rooftop infinity pool, indulge in
            gourmet meals, or unwind at our fitness center.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex justify-center items-center bg-gray-700/60 backdrop-blur-md rounded-3xl mx-32 my-12 p-10 shadow-2xl hover:shadow-amber-500/30 transition-all duration-500">
        <div className="mr-16 text-lg leading-relaxed font-medium text-gray-200 tracking-wide">
          <p>
            Our beautifully designed rooms are a fusion of modern aesthetics and
            timeless elegance, equipped with smart controls, high-speed
            internet, and premium amenities. Whether you’re here for business or
            leisure, every detail is tailored to exceed your expectations. Enjoy
            seamless check-ins and personalized service at{" "}
            <span className="text-amber-400 font-semibold">Byte Hotel</span>,
            where comfort meets innovation.
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <video
            width="520px"
            height="240px"
            autoPlay
            muted
            loop
            className="rounded-2xl hover:scale-105 transition-transform duration-700"
          >
            <source src={video2}></source>
          </video>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex justify-center items-center bg-gray-800/60 backdrop-blur-md rounded-3xl mx-32 my-12 p-10 shadow-2xl hover:shadow-amber-500/30 transition-all duration-500">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <video
            width="520px"
            height="240px"
            autoPlay
            muted
            loop
            className="rounded-2xl hover:scale-105 transition-transform duration-700"
          >
            <source src={video3}></source>
          </video>
        </div>
        <div className="ml-16 text-lg leading-relaxed font-medium text-gray-200 tracking-wide">
          <p>
            Our in-house restaurant offers a diverse menu prepared by
            world-class chefs. From hearty breakfasts to fine dining dinners,
            every dish is crafted with fresh ingredients and passion. Enjoy 24/7
            room service or dine in style with city views. Vegetarian, vegan,
            and other preferences are always handled with care. At{" "}
            <span className="text-amber-400 font-semibold">Byte Hotel</span>,
            every meal is an experience to savor.
          </p>
        </div>
      </div>
    </div>
  );
}
