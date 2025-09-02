import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons'
import { useAuth } from "../hooks/useAuth";
import LogOut from "./LogOut";

const NavBar = () => {
    const { user, loading } = useAuth();

    if (loading) return <p>Загрузка...</p>;
    return (
<nav className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">

      <div className="flex-shrink-0">
        <a href="#" className="text-xl font-bold text-gray-800">WForum</a>
      </div>
      

      <div className="hidden md:flex space-x-8">
        <a href="#" className="text-gray-600 hover:text-gray-900">Board</a>
      </div>
      {user ? (
        <p>Привет, {user.username}!</p>
      ) : (
        <p>Ты не залогинен</p>
      )}
      
      <div className="flex-shrink-0">
        <LogOut/>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
      
    </div>
  </div>
</nav>
)}

export default NavBar