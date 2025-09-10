import {neon} from "@neondatabase/serverless"
import {config} from "dotenv"
import { User } from "types";
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

async function getUserByName(username: string): Promise<User | null> {
    const rows = await sql.query("SELECT * FROM users WHERE username=$1", [username])
    console.log(rows)
    const users = rows as User[];

    return users[0] || null;
}

export async function getUserById(id: number): Promise<User | null> {
  const rows = await sql.query(
    "SELECT id, username, email, password_hash, name, address, role FROM users WHERE id = $1",
    [id]
  );

  const users = rows as User[];

  return users[0] || null;
}

async function messageGet(usetId: number) {
  const rows = await sql.query(`
    SELECT 
      posts.id,
      posts.user_id,
      posts.title,
      posts.content,
      posts.priority,
      users.username,

      -- общее количество лайков
      COUNT(DISTINCT likes.id) AS like_count,

      -- общее количество добавлений в избранное
      COUNT(DISTINCT favorites.id) AS favorite_count,

      -- лайкал ли именно текущий пользователь
      CASE WHEN EXISTS (
        SELECT id FROM likes l2 
        WHERE l2.post_id = posts.id AND l2.user_id = $1
      ) THEN true ELSE false END AS liked_by_user,

      -- добавлял ли именно текущий пользователь в избранное
      CASE WHEN EXISTS (
        SELECT 1 FROM favorites f2 
        WHERE f2.post_id = posts.id AND f2.user_id = $1
      ) THEN true ELSE false END AS favorited_by_user

    FROM posts
    LEFT JOIN users ON users.id = posts.user_id
    LEFT JOIN likes ON likes.post_id = posts.id
    LEFT JOIN favorites ON favorites.post_id = posts.id
    GROUP BY posts.id, users.username
    ORDER BY posts.priority DESC, posts.id DESC
  `, [usetId]);

  return rows;
}
  
async function messageGetById(userId: number, postId: number) {
    const rows = await sql.query(`
      SELECT 
      posts.id,
      posts.user_id,
      posts.title,
      posts.content,
      posts.priority,
      users.username,

      -- общее количество лайков
      COUNT(DISTINCT likes.id) AS like_count,

      -- общее количество добавлений в избранное
      COUNT(DISTINCT favorites.id) AS favorite_count,

      -- лайкал ли именно текущий пользователь
      CASE WHEN EXISTS (
        SELECT id FROM likes l2 
        WHERE l2.post_id = posts.id AND l2.user_id = $1
      ) THEN true ELSE false END AS liked_by_user,

      -- добавлял ли именно текущий пользователь в избранное
      CASE WHEN EXISTS (
        SELECT 1 FROM favorites f2 
        WHERE f2.post_id = posts.id AND f2.user_id = $1
      ) THEN true ELSE false END AS favorited_by_user

    FROM posts
    LEFT JOIN users ON users.id = posts.user_id
    LEFT JOIN likes ON likes.post_id = posts.id
    LEFT JOIN favorites ON favorites.post_id = posts.id
    WHERE posts.id = $2
    GROUP BY posts.id, users.username
    ORDER BY posts.priority DESC
  `,
        [userId, postId]
    );
    return rows;
}

async function messageDeleteById(id: number) {
    await sql.query("DELETE FROM posts WHERE id=$1", [id]);
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
    const rows = await sql.query("SELECT comments.id, comments.post_id, comments.user_id, comments.content, comments.created_at, users.username FROM comments LEFT JOIN USERS ON users.id = comments.user_id WHERE post_id=$1 ORDER by comments.id DESC", [postId])
    return rows
}

async function toggleLike(postId: number, userId: number) {
  const existing = await sql.query(
    "SELECT * FROM likes WHERE post_id = $1 AND user_id = $2",
    [postId, userId]
  );

  if (existing.length > 0) {
    await sql.query("DELETE FROM likes WHERE post_id = $1 AND user_id = $2", [postId, userId]);
  } else {
    await sql.query("INSERT INTO likes (post_id, user_id) VALUES ($1, $2)", [postId, userId]);
  }

  const rows = await sql.query(
    `SELECT   
       EXISTS (SELECT 1 FROM likes WHERE post_id = $1 AND user_id = $2) AS liked_by_user,
       (SELECT COUNT(*) FROM likes WHERE post_id = $1) AS like_count`,
    [postId, userId]
  );

  return rows[0];
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
  } else {
    await sql.query(
      "INSERT INTO favorites (post_id, user_id) VALUES ($1, $2)",
      [postId, userId]
    );
  }

    const rows = await sql.query(
    `SELECT   
       EXISTS (SELECT 1 FROM favorites WHERE post_id = $1 AND user_id = $2) AS favorited_by_user,
       (SELECT COUNT(*) FROM favorites WHERE post_id = $1) AS favorite_count`,
    [postId, userId]
  );

  return rows[0]
}

async function togglePriority(postId: number) {
  // Ищем пост только по id
  const result = await sql.query(
    "SELECT id, user_id, priority FROM posts WHERE id = $1",
    [postId]
  );

  if (!result || result.length === 0) {
    throw new Error("Пост не найден");
  }

  const post = result[0];

  const currentPriority = post.priority;

  let newPriority: number;
  if (currentPriority === 0) {
    newPriority = 1;
  } else {
    newPriority = currentPriority - 1;
  }

  await sql.query(
    "UPDATE posts SET priority = $1 WHERE id = $2",
    [newPriority, postId]
  );

  return { newPriority };
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
    togglePriority
}