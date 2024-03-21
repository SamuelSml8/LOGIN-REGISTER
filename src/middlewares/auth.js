const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Emplooye = require("../models/emplooyeModel.js");

const jwt_Secret = ".*#/$=1sMl*!$%&/($DF";

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt_Secret,
  },
  async (jwtPayload, done) => {
    try {
      const emplooyeFound = await Emplooye.findById({ userId: jwtPayload.id });

      if (!emplooyeFound) {
        const error = new Error("Emplooye not found");
        console.log(error);
      }

      done(null, emplooyeFound);
    } catch (error) {
      done(error);
    }
  }
);

passport.use(strategy);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

module.exports = {
  initialize,
  authenticate,
};
