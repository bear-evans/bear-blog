// =============================================
//  Bearpress Server Core
// ---------------------------------------------
// Initializes primary components and starts
// the server
// =============================================

// Initialize main modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize secondary utilities
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Set up server
const app = express();
const PORT = process.env.PORT || 3001;
const bearStore = new SequelizeStore({ db: sequelize });

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1200,
  },
  resave: false,
  saveUninitialized: false,
  store: bearStore,
};

// Link it
app.use(session(sess));

bearStore.sync();

// Set up addons
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'main',
    helpers: helpers,
  })
);
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server initialization complete. Server listening on ${PORT}`);
  });
});
