import { Avatar, Card, Space } from "antd"
import { UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from "react-router";
import type { Msg } from "../types";

const Message = ({message} : {message: Msg} )=> {

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
    const target = `/board/${message.id}/comments`;
    if (location.pathname !== target) {
      navigate(target);
    }
  };

    console.log(message, "fdfdfdfdf")
    return (
         <Space direction="vertical" size={16} onClick={handleClick}>
            <Card title={
                <div className="flex items-center gap-3">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <span>{message.username}</span>
                </div>
            }
            style={{ 
                width: 300 
            }}
            >
                <p className=" text-2xl mb-3 text-center">{message.title}</p>
                <p className="">{message.content}</p>
            </Card>
        </Space>
    )
}

export default Message;