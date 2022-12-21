require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');

mongoose.set('strictQuery', true);

const db = 'mongodb://127.0.0.1:27017/events';
mongoose.connect(db).then(() => {
  console.log('Connection to DB successful.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`);
});
