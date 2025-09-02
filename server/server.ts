import express, { Request, Response } from "express"
import router from "@/routes/index"
import pgSession from "connect-pg-simple";
import { Pool } from 'pg';
import session from "express-session"
import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local';
import queries from "@/queries/queries";
import {config} from "dotenv"
import cors from "cors"

config()
const app = express()


async function main() {
    app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    }));

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    });

    const PgSession = pgSession(session);

    app.use(session({
    store: new PgSession({
        pool: pgPool,
        tableName: 'session',
    }),
    secret: process.env.FOO_COOKIE_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
    new LocalStrategy( { usernameField: 'username', passwordField: 'password' }, 
    async (username, password, done) => {
            console.log("LocalStrategy called:", username); 
        try {
        const user  = await queries.getUserByName(username)

        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }

        const match = password === user.password_hash

        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
        } catch(err) {
        return done(err);
        }
    })
    );

    passport.serializeUser((user: any, done) => {
        if (!user || !user.id) {
            console.error("serializeUser: invalid user object", user);
            return done(new Error("Invalid user object"));
        }
        const userId = parseInt(user.id, 10);
        done(null, userId);
    });

    passport.deserializeUser(async (id: any, done) => {
    console.log("deserializeUser called with:", id, typeof id);

    try {
        const userId = Number(id);
        if (!id || isNaN(userId)) {
        console.error("deserializeUser: invalid id", id);
        return done(null, false);
        }

        const user = await queries.getUserById(userId);
        if (!user) {
        return done(null, false);
        }

        done(null, user);
    } catch (err) {
        console.error("Error in deserializeUser:", err);
        done(err);
    }
    });



    app.use("/", router)

    app.all("/{*splat}", (req: Request, res: Response) => {
        res.status(404).send("404")
    })
    
    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
}



main();