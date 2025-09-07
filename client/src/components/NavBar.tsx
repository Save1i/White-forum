import { Avatar, Skeleton } from "antd";
import { UserOutlined } from '@ant-design/icons'
import { useAuth, type User } from "../hooks/useAuth";
import LogOut from "./LogOut";
import { useNavigate } from "react-router";
import DropDown from "./DropDown";

const NavBar = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate()

    console.log(loading)

    const gotoLogIn = () => {
      navigate("/user/log-in")
    } 

    const handleClick = () => {
      navigate("/board")
    }

    const greetingUser = (user: User | null) => {
      return (user ? (
              <p>Привет, {user.username}!</p>
            ) : (
              <p>Не зарегистрирован</p>
            ))
    }
    
    return (
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex-shrink-0">
              <p className="text-xl font-bold text-gray-800 cursor-pointer" onClick={handleClick}>WForum</p>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Board</a>
            </div>

            {!loading ? (greetingUser(user)) : (<Skeleton.Input active size="small" style={{ width: 60 }} />)}

            <div className="flex-shrink-0">
              {user ? <LogOut/> : <button onClick={gotoLogIn}>Log in</button>}
              <DropDown avatar={<Avatar size="large" icon={<UserOutlined />} />}/>
            </div>
          </div>
        </div>
      </nav>
    )}

export default NavBar