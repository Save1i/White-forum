import { Card, Avatar, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";

interface CommentCardProps {
  comment?: { username: string; content: string };
}

const CommentCard = ({ comment }: CommentCardProps) => {
    const { loading} = useAuth()
  return (
    <Card
      className="w-2xs md:w-2xl"
      title={
        <div className="flex items-center gap-3">
          {loading ? (
            <Skeleton.Avatar active size="large" shape="circle" />
          ) : (
            <Avatar size="large" icon={<UserOutlined />} />
          )}
          {loading ? (
            <Skeleton.Input active size="small" style={{ width: 120 }} />
          ) : (
            <span>{comment?.username}</span>
          )}
        </div>
      }
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} title={false} />
      ) : (
        <p>{comment?.content}</p>
      )}
    </Card>
  );
};

export default CommentCard;