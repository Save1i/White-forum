import axios from "axios"
import Message from "./Message"
import { useEffect, useState } from "react"
import type { Msg } from "../types";
import { Skeleton, Card } from "antd";

const Board = () => {
  const [messages, setMessages] = useState<Msg[] | null>(null)

  const fetchMessages = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}board`, { withCredentials: true })
      .then(response => {
        setMessages(response.data)
      })
      .catch(err => {
        console.error("Ошибка при загрузке сообщений:", err)
      })
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const skeletons = Array.from({ length: 3 }).map((_, idx) => (
    <Card key={idx} className="w-2xs md:w-2xl mb-4">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton.Avatar active size="large" shape="circle" />
        <Skeleton.Input active size="small" style={{ width: 120 }} />
      </div>
      <Skeleton active paragraph={{ rows: 2 }} />
    </Card>
  ))

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen pt-10">
      {messages
        ? messages.map((message: Msg) => (
            <Message key={message.id} message={message} />
          ))
        : skeletons}
    </div>
  )
}

export default Board