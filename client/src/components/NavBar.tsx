import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons'

const NavBar = () => {
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

        <div className="flex-shrink-0">
            <Avatar size="large" icon={<UserOutlined />} />
      </div>
      
    </div>
  </div>
</nav>
)}

export default NavBar