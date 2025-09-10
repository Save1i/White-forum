import { Request, Response } from "express";

export function checkRole(role: string) {
  return (req: Request, res: Response, next: Function) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ error: "Не авторизован" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ error: "Нет доступа" });
    }

    next();
  };
}
