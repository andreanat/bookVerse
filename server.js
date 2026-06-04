const express = require("express");
const mongodb = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const isAuthenticated = (req, res, next) => {
  if (req.session.user !== undefined) {
    return next();
  }
  return res.status(401).json("You do not have access.");
};

app.get("/", (req, res) => {
  if (req.session.user !== undefined) {
    res.send(`Logged in as ${req.session.user.displayName}`);
  } else {
    res.send("Logged out");
  }
});

app.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs"
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/books", require("./routes/books"));
app.use("/authors", require("./routes/authors"));

app.get("/auth/status", (req, res) => {
  if (req.session.user !== undefined) {
    res.status(200).json({
      authenticated: true,
      user: req.session.user.displayName
    });
  } else {
    res.status(200).json({
      authenticated: false
    });
  }
});

app.get("/protected-test", isAuthenticated, (req, res) => {
  res.status(200).json("You have access to this protected route.");
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});