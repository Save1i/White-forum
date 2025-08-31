import { UserOutlined } from "@ant-design/icons"
import { Avatar, Card, Space } from "antd"
import type { Comm } from "../types"


const Comment = ({comment}: {comment: Comm}) => {


    return (
        <Space direction="vertical" size={16}>
            <Card title={
                <div className="flex items-center gap-3">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <span>{comment.id}</span>
                </div>
            }
            style={{ 
                width: 300 
            }}
            >
                <p className="">{comment.content}</p>
            </Card>
        </Space>
    )
}

export default Comment