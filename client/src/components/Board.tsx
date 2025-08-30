import axios from "axios"
import Message from "./Message"
import { useEffect, useState } from "react"
import { Spin } from "antd";

type Msg = { id: number; username: string; title: string; content: string };


const Board = () => {
    const [messages, setMessages] = useState<Msg[] | null>(null)

    const fetchMessages = () => {
        axios.get(`${import.meta.env.VITE_API_URL}board`).then(response => {
            console.log(response.data)
            setMessages(response.data)
        })
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('click', e)
    }

    return (
    <div className="flex items-center justify-start w-full h-screen column flex-col pt-20">
        {
            messages ? (messages.map((message: Msg) => (
                <Message key={message.id} message={message} onClick={(e) => onClick(e)}/>
            ))) : (<Spin/>)
        }
    </div>
    )
} 

export default Board