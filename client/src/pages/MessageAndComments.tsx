import { useEffect, useState } from "react"
import Comments from "../components/Comments"
import Message from "../components/Message"
import NavBar from "../components/NavBar"
import axios from "axios"
import { useParams } from "react-router"
import { Spin } from "antd"
import WriteComment from "../components/WriteComment"

const MessageAndComments = () => {
    const { postId } = useParams<{ postId: string }>();

    const [message, setMessage] = useState(null)
    const [newComment, setNewComment] = useState(false)

    const fetchMessages = () => {
        axios.get(`${import.meta.env.VITE_API_URL}board/${postId}`, {
            withCredentials: true
        }).then(response => {
            console.log(response.data, "message")
            setMessage(response.data)
        })
    }

    useEffect(() => {
        fetchMessages()
    }, [])
    
    return (<>
        <NavBar/>
        <div className="flex items-center justify-start w-full column flex-col pt-20">
        {
            message 
                ? (<Message message={message}/>) 
                : <Spin/>
        }   
        <WriteComment postId={postId} setSendComment={setNewComment}/>
        </div>
        <Comments postId={postId} newComment={newComment}/>
    </>)
}

export default MessageAndComments