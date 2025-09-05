import { Card, Skeleton } from "antd";
import axios from "axios"
import { useEffect, useState } from "react"
import Comment from "./Comment";
import type { Comm } from "../types";


const Comments = ({postId, newComment}: {postId: string | undefined, newComment: boolean}) => {

    const [comments, setCommets] = useState<Comm[] | null>(null)
    
    const skeletonC = (
    <Card className="w-2xs md:w-2xl"
        title={
          <div className="flex items-center gap-3">
            <Skeleton.Avatar active size="large" shape="circle" />
            <Skeleton active title={false} paragraph={{rows: 1}} style={{ width: 200 }}/>
          </div>
        }>
          <Skeleton active title={false} paragraph={{rows: 1}}/>
        </Card>
  )

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
    }, [newComment])

  return (
    <div className="flex items-center justify-start gap-3 w-full h-screen column flex-col pt-5">
        {
            comments ? (comments.map((comment) => (
                <Comment key={comment.id} comment={comment}/>
            ))) : skeletonC
        }
    </div>
  )
}

export default Comments