import axios from "axios"
import { useEffect } from "react"

const MessageAndComments = () => {
        const fetchMessages = () => {
        axios.get(`${import.meta.env.VITE_API_URL}board/:postId/comments`).then(response => {
            console.log(response.data)
        })

        useEffect(()=> {
            fetchMessages()
        }, [])
    }
    return (<p>Hello</p>)
}

export default MessageAndComments