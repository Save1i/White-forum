import { Avatar, Skeleton } from "antd";
import { UserOutlined } from '@ant-design/icons'
import { useAuth } from "../hooks/useAuth";
import LogOut from "./LogOut";
import { useNavigate } from "react-router";

const NavBar = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate()

    const NavSkeleton = () => {
      return (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">

              <div className="flex-shrink-0">
                <Skeleton.Input active size="small" style={{ width: 100 }} />
              </div>

              <div className="hidden md:flex space-x-8">
                <Skeleton.Input active size="small" style={{ width: 60 }} />
                <Skeleton.Input active size="small" style={{ width: 60 }} />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton.Input active size="small" style={{ width: 120 }} />
                <Skeleton.Avatar active size="large" shape="circle" />
              </div>

            </div>
          </div>
        </nav>
      );
};

    if (loading) return <NavSkeleton/>;

    const handleClick = () => {
      navigate("/board")
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