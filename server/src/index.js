const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({
    origin:"http://localhost:5000",
}))
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

require('dotenv').config();
require('./routes/auth/auth')(app);
require('./routes/user/user')(app);
require('./routes/todos/todos')(app);

app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`);
});