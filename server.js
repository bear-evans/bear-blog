// =============================================
//  Bear Blog Server Core
// ---------------------------------------------
// Initializes primary components and starts
// the server
// =============================================

// Initialize main modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Initialize secondary utilities
const routes = require("./controllers");
const sequelize = require(".config/connection");
const helpers = require("./utils/helpers");
const { urlencoded } = require("express");

// Set up server
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 3600,
    httpOnly: false,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

// Link it
app.use(session(sess));

// Set up addons
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server initialization complete. Server listening on ${PORT}`);
  });
});
