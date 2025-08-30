import { Avatar, Card, Space } from "antd"
import { UserOutlined } from '@ant-design/icons'

type Msg = { id: number; username: string; title: string; content: string };

const Message = ({message, onClick} : {message: Msg; onClick: (e: React.MouseEvent) => void}) => {
    return (
         <Space direction="vertical" size={16} onClick={onClick}>
            <Card title={
                <div className="flex items-center gap-3">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <span>{message.username}</span>
                </div>
            }
            extra={<a href="#">More</a>} 
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