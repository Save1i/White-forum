import { Avatar, Skeleton, type MenuProps } from "antd";
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth, type User } from "../hooks/useAuth";
import LogOut from "./LogOut";
import { useNavigate } from "react-router";
import DropDown from "./DropDown";
import { useMemo} from "react";


const NavBar = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

  const dropDownItems = useMemo<MenuProps["items"]>(() => {
    if (!user && !loading) {
      return [
        {
          key: "4",
          label: "Войти",
          icon: <LoginOutlined />,
          onClick: () => navigate("/user/log-in"),
        },
      ];
    }

    if (user && user.role === "admin") {
      return [
        {
          key: "1",
          label: "Мой профиль",
          icon: <UserOutlined />,
          onClick: () => navigate(`/user/${user.id}`),
        },
        { type: "divider" as const },
        {
          key: "2",
          label: "All users",
          onClick: () => navigate("/user"),
        },
        { type: "divider" as const },
        {
          key: "3",
          label: <LogOut />,
          icon: <LogoutOutlined />,
        },
      ];
    }

    if (user) {
      return [
        {
          key: "1",
          label: "Мой профиль",
          icon: <UserOutlined />,
          onClick: () => navigate(`/user/${user.id}`),
        },
        { type: "divider" as const },
        {
          key: "3",
          label: <LogOut />,
          icon: <LogoutOutlined />,
        },
      ];
    }

    return [];
  }, [user, loading, navigate]);



    console.log(user)

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

            <div className="flex items-center gap-4">
                  <DropDown
                    avatar={
                      <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        className="cursor-pointer border border-gray-200 shadow-sm"
                      />
                    }
                    items={dropDownItems}
                  />
                  
            </div>

          </div>
        </div>
      </nav>
    )  
  }

export default NavBar