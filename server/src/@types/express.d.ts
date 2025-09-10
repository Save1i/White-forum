import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      email: string;
      password_hash: string;
      name: string;
      address: string;
      role: "admin" | "user";
    }
  }
}
