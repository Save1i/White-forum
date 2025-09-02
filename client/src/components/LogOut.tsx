import axios from "axios";
import { useNavigate } from "react-router";

const LogOut = () => {

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
        await axios.get(`${import.meta.env.VITE_API_URL}user/log-out`, { withCredentials: true });
        navigate("/user/log-in");
        } catch (error) {
        console.error("Logout error:", error);
        }
  };

  return (
    <button onClick={handleLogout}>Log out</button>
  )
}

export default LogOut