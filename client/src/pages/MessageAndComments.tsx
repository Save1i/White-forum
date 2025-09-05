import { useEffect, useState } from "react"
import Comments from "../components/Comments"
import Message from "../components/Message"
import NavBar from "../components/NavBar"
import axios from "axios"
import { useParams } from "react-router"
import { Skeleton, Card, Tooltip } from "antd"
import WriteComment from "../components/WriteComment"
import type { Msg } from "../types"

const MessageAndComments = () => {
  const { postId } = useParams<{ postId: string }>();

  const [message, setMessage] = useState<Msg | null>(null)
  const [newComment, setNewComment] = useState(false)

  const fetchMessage = () => {
    axios.get(`${import.meta.env.VITE_API_URL}board/${postId}`, {
      withCredentials: true,
    }).then(response => {
      setMessage(response.data)
    }).catch(err => {
      console.error("Ошибка при загрузке сообщения:", err)
    })
  }

  useEffect(() => {
    fetchMessage()
  }, [])

  const skeletonM = (
    <Card className="w-2xs md:w-2xl"
        title={
          <div className="flex items-center gap-3">
            <Skeleton.Avatar active size="large" shape="circle"/>
            <Skeleton.Input active size="small" style={{ width: 120 }}/>
          </div>
        } 
        actions={[
          <Tooltip>
            <Skeleton.Button active size="small" shape="round" key="like" />
          </Tooltip>,
          <Tooltip>
            <Skeleton.Button active size="small" shape="round" key="like" />
          </Tooltip>,
          <Tooltip>
            <Skeleton.Button active size="small" shape="round" key="like" />
          </Tooltip>
        ]}>
          <Skeleton.Input active size="small" style={{ width: 120 }}className="mb-2 mt-1.5" />
          <Skeleton active title={false} paragraph={{rows: 1}}/>
        </Card>
  )

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-start w-full flex-col pt-10">
        {message ? <Message message={message} /> : skeletonM}
        <WriteComment postId={postId} setSendComment={setNewComment} />
      </div>
      <Comments postId={postId} newComment={newComment} />
    </>
  )
}

export default MessageAndComments