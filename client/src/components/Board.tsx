import WriteMessage from "./WriteMessage";
import Messages from "./Messages";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Msg } from "../types";
import axios from "axios";
import Chekable from "./Chekable";

const Board = () => {
  const [messages, setMessages] = useState<Msg[] | null>(null); //

  const [names, setNames] = useState<string[]>([]);


  const fetchMessages = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}board`, { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Ошибка при загрузке сообщений:", err));
  }, []);
      const renders = useRef(0);

  useEffect(() => {
    renders.current += 1;
    console.log(`🔄 Board render count: ${renders.current}`);
  });

  const filtMessages = useMemo(() => {
    if (!messages) return null;
    if (names.length === 0) return messages;
    return messages.filter((msg) => names.includes(msg.username));
  }, [messages, names]);

  const treeData = useMemo(() => {
    if (!messages) return [];
    const uniqNames = Array.from(new Set(messages.map((m) => m.username)));
    return uniqNames.map((name) => ({
      title: name,
      value: name,
      key: name,
    }));
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen pt-10 gap-5">
      <WriteMessage onSuccess={fetchMessages} />
      <div>
        <Chekable addName={setNames} allnames={treeData} names={names}/>
        <Messages messages={filtMessages} fetchMessages={fetchMessages} /> {/*filtMessages/*/}
      </div>
    </div>
  )
}

export default Board