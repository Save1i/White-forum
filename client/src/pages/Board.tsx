import WriteMessage from "../components/WriteMessage";
import Messages from "../components/Messages";
import { useCallback, useEffect, useState } from "react";
import type { Msg } from "../types";
import axios from "axios";
import Chekable from "../components/Chekable";

const Board = () => {
  const [messages, setMessages] = useState<Msg[] | null>(null);

  const [filtMessages, setFiltMessages] = useState<Msg[] | null>([])
  const [treeData, setTreeData] = useState<Object[]>([])

  const [names, setNames] = useState([])

  const fetchMessages = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}board`, { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Ошибка при загрузке сообщений:", err));
  }, []);

  const messagesFilt = (messages: Msg[] | null, names: Array<string>) => {
    const result = []

    if (names.length < 1 || messages == null) {
      setFiltMessages(messages)
      return
    }

    for (let i = 0; i < messages.length; i++) {

      if (names.includes(messages[i].username)) {
        result.push(messages[i])
      }
    }

    setFiltMessages(result)
  }

  const makeAnObjectNames = (messages: Msg[] | null) => {
    const result = []
    const defaultObj = {title: 'anonyme', value: 'anonyme', key: 'anonyme'}

    if(!messages) return

    const uniqNames: string[] = []

    for (let i = 0; i < messages.length; i++) {
      const nameValue = messages[i].username
      if(uniqNames.includes(nameValue)) {
        continue
      } else {
        uniqNames.push(nameValue)
      }
    }

    for (let i = 0; i < uniqNames.length; i++) {
      const nameValue = uniqNames[i]

      const nameObj = {...defaultObj, title: nameValue, value: nameValue, key: nameValue}
      result.push(nameObj)
    }

    setTreeData(result)
  }

  useEffect(() => {
    makeAnObjectNames(messages)
    messagesFilt(messages, names)
  }, [messages, names])



  console.log(treeData)

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