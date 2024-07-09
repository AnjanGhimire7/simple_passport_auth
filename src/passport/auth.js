import passport from "passport";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Strategy as LocalStrategy } from "passport-local";
passport.use(
  new LocalStrategy(function (userName, password, done) {
    try {
      const user = User.findOne({ userName });
      if (!user) {
        return done(null, false, { message: "Incorrect Username!!!" });
      }
      const isPasswordValid = user.isPasswordCorrect(password);
      if (isPasswordValid) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password!!!" });
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  try {
    const user = User.findById(id);
    if (user) {
      done(null, user); //return user of exits
    } else {
      done(new ApiError(404, "User doesn't exists"), null); //throw an error if user doesn't exists!!!
    }
  } catch (error) {
    done(
      new ApiError(500, "Something went wrong while deserializing the user"),
      null
    );
  }
});
const localAuth= passport.authenticate('local',{session:false})
export{localAuth}