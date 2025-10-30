import Navbar from "../components/AdminComponents/Navbar";
import { useNavigate } from "react-router-dom";


export default function AdminPage() {
    const navigate = useNavigate();
    function loggingOut(){
      localStorage.removeItem("AdminToken");
      navigate('/home')
    }

    
  return (
    <div>
      <Navbar onclick={loggingOut}/>
      
          
    </div>
  );
}
