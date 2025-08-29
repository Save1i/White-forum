import express, { Request, Response } from "express"
import router from "@/routes/index"
import pgSession from "connect-pg-simple";
import { Pool } from 'pg';
import session from "express-session"
import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local';
import queries from "@/queries/queries";
import {config} from "dotenv"

config()
const app = express()


async function main() {
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
        const rows  = await queries.getUserByName(username)
        const user = rows[0];

        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }

        const match = password === user.password

        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
        } catch(err) {
        return done(err);
        }
    })
    );

    passport.serializeUser((user: Express.User, done) => {
    console.log("Serializing user:", user);
        done(null, (user as any).id);
    });

    passport.deserializeUser(async (id: number, done) => {
        try {
            const user = await queries.getUserById(id);
            if (!user) {
                return done(null, false);
            }
            done(null, user);
        } catch (err) {
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