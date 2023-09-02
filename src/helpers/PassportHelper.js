import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import Auth from "./JwtHelper.js";
passport.use(
    new BearerStrategy(
        {
            passReqToCallback: true,
        },
        async function (req, token, done) {
            const usuario = await new Auth().validateToken(req, token);
            if (!usuario) return done(null, false);
            return done(null, usuario);
        }
    )
);
export default passport;