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

    await query.insertUser(
      username,
      email,
      password,
      name,
      address,
      role
    );

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
    const { username, email, password, name, address, role } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing user id" });
    }

    const updatedUser = await query.updateUser( Number(id), username, email, password, name, address, role);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found or no data to update" });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Server error" });
  }
}


async function createMessagePost(req: Request, res: Response) {
  try {
    const {title, content} = req.body
    const session = req.session as PassportSession;
    const id = session.passport?.user as number // временно
    await query.messagePost(title, content, id)
    res.json({title, content})
  } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Server error" });
  }
}

async function getAllMessages(req: Request, res: Response) {
    console.log(req.isAuthenticated())
    const isAuth = req.isAuthenticated() // не нужно
    const messages = await query.messageGet()
    res.json(messages)
}


export default {
    createUser,
    getAllMessages,
    createMessagePost,
    updateUser,
}