import { Spin } from "antd";
import axios from "axios"
import { useEffect, useState } from "react"
import Comment from "./Comment";
import type { Comm } from "../types";


const Comments = ({postId}: {postId: string | undefined}) => {

    const [comments, setCommets] = useState<Comm[] | null>(null)

    const fetchComments = () => {
        if(postId) {
            axios.get(`${import.meta.env.VITE_API_URL}board/${postId}/comments`).then(response => {
                console.log(response.data)
                setCommets(response.data)
            })
        }
    }
    
    useEffect(() => {
        fetchComments()
    }, [])

  return (
    <div className="flex items-center justify-start w-full h-screen column flex-col pt-5">
        {
            comments ? (comments.map((comment) => (
                <Comment key={comment.id} comment={comment}/>
            ))) : (<Spin/>)
        }
    </div>
  )
}

export default Comments