const path = require('path');
const express = require('express');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const bodyParser = require('body-parser')
const multer = require('multer');
const serviceKey = path.join(__dirname, './config/keys.json');
const Cloud = require('@google-cloud/storage')
const uploadImage = require('./utils/helpers')
const gc = require('../config/the-informed-artist-281501-b76d1cf9db08.json');
const bucket = gc.bucket('the-informed-artist');

const { Storage } = Cloud

const storage = new Storage({
   keyFilename: serviceKey,
   projectId: 'your project id',
 })

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
   secret: 'secret123',
   cookie: {},
   resave: false,
   saveUninitialized: true,
   store: new SequelizeStore({
      db: sequelize
   })
};

const multerMid = multer({
   storage: multer.memoryStorage(),
   limits: {
     fileSize: 5 * 1024 * 1024,
   },
 });

const app = express();
const PORT = process.env.PORT || 3001;



app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/uploads', (req, res, next) => {
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.post('/uploads', async (req, res, next) => {
   try {
     const myFile = req.file
     const imageUrl = await uploadImage(myFile)
     res
       .status(200)
       .json({
         message: "Upload was successful",
         data: imageUrl
       })
   } catch (error) {
     next(error)
   }
 });

 app.use((err, req, res, next) => {
   res.status(500).json({
     error: err,
     message: 'Internal server error!',
   })
   next()
 })
 

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log('Now listening'));
});

module.exports = storage