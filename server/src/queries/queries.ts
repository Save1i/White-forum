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

async function updateUser(id: number, email?: string, password?: string, name?: string, address?: string, role?: string) {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (email) {
    fields.push(`email = $${idx++}`);
    values.push(email);
  }
  if (password) {
    fields.push(`password_hash = $${idx++}`);
    values.push(password);
  }
  if (name) {
    fields.push(`name = $${idx++}`);
    values.push(name);
  }
  if (address) {
    fields.push(`address = $${idx++}`);
    values.push(address);
  }
  if (role) {
    fields.push(`role = $${idx++}`);
    values.push(role);
  }

  if (fields.length === 0) return null; 

  values.push(id);
  const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;

  const result = await sql.query(query, values);
  return result;
}

async function getAllUsers() {
    const users = await sql.query("SELECT * FROM users")
    return users
}

async function getUserByName(username: string) {
    const rows = await sql.query("SELECT * FROM users WHERE username=$1", [username])
    console.log(rows)
    return rows
}

async function getUserById(id: number) {
    const rows = await sql.query("SELECT * FROM users WHERE id=$1", [id])
    return rows
}

async function messageGet() {
    const rows = await sql.query("SELECT posts.user_id, posts.id, title, content, username FROM posts LEFT JOIN USERS ON USERS.ID = posts.user_id") //добавить лайки избранное и приоритет
    return rows
}

async function messageGetById(id: number) {
    const rows = await sql.query("SELECT * FROM posts WHERE id=$1", [id]);
    return rows
}

async function messageDeleteById(id: number) {
    const rows = await sql.query("DELETE FROM posts WHERE id=$1", [id]);
    return rows
}

async function messagePost(title: string, content: string, id: number, priority: number = 0) {
    if(id) {
        await sql.query("INSERT INTO Posts (title, content, user_id, priority) VALUES ($1, $2, $3, $4)", [title, content, id, priority])
    } else {
        await sql.query("INSERT INTO Posts (title, content, user_id, priority) VALUES ($1, $2, $3, $4)", [title, content, 1, priority])
    }
}

async function insertComment(postId: number, userId: number, content: string) {
    if(userId) {
        await sql.query("INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3)", [postId, userId, content])
    } else {
        await sql.query("INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3)", [postId, 1, content])
    }
}

async function commentGet(postId: number) {
    const rows = await sql.query("SELECT * FROM comments WHERE post_id=$1", [postId])
    return rows
}

async function toggleLike(postId: number, userId: number, type: "like" | "dislike") {
  const result = await sql.query(
    "SELECT type FROM likes WHERE post_id = $1 AND user_id = $2",
    [postId, userId]
  );

  if (result.length > 0) {
    const existingType = result[0].type;

    if (existingType === type) {
      await sql.query(
        "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
        [postId, userId]
      );
      return { action: "removed", type };
    } else {
      await sql.query(
        "UPDATE likes SET type = $3 WHERE post_id = $1 AND user_id = $2",
        [postId, userId, type]
      );
      return { action: "updated", type };
    }
  } else {
    await sql.query(
      "INSERT INTO likes (post_id, user_id, type) VALUES ($1, $2, $3)",
      [postId, userId, type]
    );
    return { action: "inserted", type };
  }
}

async function toggleFavorite(postId: number, userId: number) {
  const result = await sql.query(
    "SELECT 1 FROM favorites WHERE post_id = $1 AND user_id = $2",
    [postId, userId]
  );

  if (result.length > 0) {
    await sql.query(
      "DELETE FROM favorites WHERE post_id = $1 AND user_id = $2",
      [postId, userId]
    );
    return { action: "removed" };
  } else {
    await sql.query(
      "INSERT INTO favorites (post_id, user_id) VALUES ($1, $2)",
      [postId, userId]
    );
    return { action: "inserted" };
  }
}


export default {
    insertUser,
    insertComment,
    toggleLike,
    toggleFavorite,
    getAllUsers,
    getUserById,
    getUserByName,  
    messagePost,  
    messageGet,
    messageGetById,
    commentGet,
    messageDeleteById,
    updateUser,

}