const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars')

const { adminRoutes } = require('./routes/admin');
const { shopRoutes } = require('./routes//shop');
const rootDir = require('./utils/path');
const { get404Page } = require('./controllers/404Control');
const { mysqlDatabase } = require('./utils/database');

const app = express();

//set view engine -> to use template engine
app.set('view engine', 'ejs'); // ejs -> same as pug -> automatically install by express

//app.engine('hbs', expressHbs({layoutsDir: 'views/layout/', defaultLayout: 'main-layout', extname: 'hbs'}))
//app.set('view engine', 'hbs') // express-handlebars
//app.set('view engine', 'pug') // pug -> express will automatically install pug -> no need to explicitly require

app.set('views', 'views'); // where to find the template

mysqlDatabase
  .execute('SELECT * FROM products')
  .then(result => {
    console.log(result[0])
    console.log(result[1])
  })
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

// use -> handle all http methods (get, post, delete ..etc)
app.use(get404Page);

app.listen(3000);
