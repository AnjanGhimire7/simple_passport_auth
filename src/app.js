import helmet from "helmet";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(passport.initialize());

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.session());

//import routes
import userRouter from "./routes/user.route.js";

//declaration of routes
app.use("/api/v1/users", userRouter);

export { app };
