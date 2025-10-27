import { Header } from "../components/Header";
import Navbar from "../components/Navbar";
import { Statusbar } from "../components/Statusbar";
import VideoSection from "../components/VideoSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
        <Navbar/>
        <Header/>
        <Statusbar basic={48} luxury={90} total={138}/>
        <VideoSection/>
        <Footer/>

    </div>
  )
}
