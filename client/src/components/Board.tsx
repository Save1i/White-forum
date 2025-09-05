import WriteMessage from "./WriteMessage";
import Messages from "./Messages";
import { useCallback, useState } from "react";
import type { Msg } from "../types";
import axios from "axios";

const Board = () => {
  const [messages, setMessages] = useState<Msg[] | null>(null);

  const fetchMessages = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}board`, { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Ошибка при загрузке сообщений:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen pt-10 gap-5">
      <WriteMessage onSuccess={fetchMessages} />
      <Messages messages={messages} fetchMessages={fetchMessages} />
    </div>
  )
}

export default Board