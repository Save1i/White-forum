import {neon} from "@neondatabase/serverless"
import {config} from "dotenv"
config()
const sql = neon(process.env.DATABASE_URL as string);

async function insertUser(username: string, email: string, password: string, name: string, address: string, role: string = "user") {
    await sql.query(
        "INSERT INTO users (username, email, password_hash, name, address, role) VALUES ($1, $2, $3, $4, $5, $6)",
        [username, email, password, name, address, role]
    )
}

async function insertPost(userId: number, title: string, content: string, priority: number = 0) {
    await sql.query(
        "INSERT INTO posts (user_id, title, content, priority) VALUES ($1, $2, $3, $4)",
        [userId, title, content, priority]
    )
}

async function insertComment(postId: number, userId: number, content: string) {
    await sql.query(
        "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3)",
        [postId, userId, content]
    )
}

async function insertLike(postId: number, userId: number, type: "like" | "dislike") {
    await sql.query(
        "INSERT INTO likes (post_id, user_id, type) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
        [postId, userId, type]
    )
}

async function insertFavorite(postId: number, userId: number) {
    await sql.query(
        "INSERT INTO favorites (post_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [postId, userId]
    )
}

export default {
    insertUser,
    insertPost,
    insertComment,
    insertLike,
    insertFavorite
}