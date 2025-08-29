import { Request, Response } from "express"
import query from "../queries/queries"

interface PassportSession {
  passport?: {
    user: number;
  };
}

async function createUser(req: Request, res: Response) {
  try {
    const { username, email, password, name, address, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await query.insertUser(username, email, password, name, address, role);

    return res.status(201).json({ username,
      email,
      password,
      name,
      address,
      role });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { email, password, name, address, role } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing user id" });
    }

    const updatedUser = await query.updateUser( Number(id), email, password, name, address, role);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found or no data to update" });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await query.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await query.getUserById(Number(id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getUserByName(req: Request, res: Response) {
  try {
    const { username } = req.params;
    const user = await query.getUserByName(username);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by name:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function createMessagePost(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const session = req.session as PassportSession;
    const id = session.passport?.user as number;

    await query.messagePost(title, content, id);
    res.json({ title, content });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getAllMessages(req: Request, res: Response) {
  try {
    const isAuth = req.isAuthenticated() // не нужно
    const messages = await query.messageGet();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getMessageById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const message = await query.messageGetById(Number(id));
    if (!message) return res.status(404).json({ error: "Post not found" });
    res.json(message);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function deleteMessageById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await query.messageDeleteById(Number(id));
    res.json({ success: true, id });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function addComment(req: Request, res: Response) {
  try {
    const { content, userid } = req.body;
    const { postId } = req.params;
    const session = req.session as PassportSession;
    const userId = session.passport?.user as number;

    await query.insertComment(Number(postId), userId, content);
    res.json({ postId, userId, content });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getComments(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const comments = await query.commentGet(Number(postId));
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function toggleLike(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const { type } = req.body;
    const session = req.session as PassportSession;
    const userId = session.passport?.user as number;

    const result = await query.toggleLike(Number(postId), userId, type);
    res.json(result);
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function toggleFavorite(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const session = req.session as PassportSession;
    const userId = session.passport?.user as number;

    const result = await query.toggleFavorite(Number(postId), userId);
    res.json(result);
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

export default {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByName,

  createMessagePost,
  getAllMessages,
  getMessageById,
  deleteMessageById,

  addComment,
  getComments,

  toggleLike,
  toggleFavorite,
};