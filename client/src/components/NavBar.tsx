import { Avatar, Skeleton, type MenuProps } from "antd";
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth, type User } from "../hooks/useAuth";
import LogOut from "./LogOut";
import { useNavigate } from "react-router";
import DropDown from "./DropDown";

const NavBar = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
      {
        key: '1',
        label: 'My Account',
        onClick: () => navigate('/user/4')
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        label: 'Profile',
      },
      {
        key: '3',
        label: 'Billing',
      },
      {
        key: '4',
        label: 'Settings',
        icon: <SettingOutlined />,
      },
    ];

    console.log(loading)
    console.log(user)

    const gotoLogIn = () => {
      navigate("/user/log-in")
    } 

    const handleClick = () => {
      navigate("/board")
    }

    const greetingUser = (user: User | undefined) => {
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
              <DropDown avatar={<Avatar size="large" icon={<UserOutlined />} />} items={items}/>
            </div>
          </div>
        </div>
      </nav>
    )}

export default NavBar