require('dotenv').config();
const mongoose = require('mongoose');
const scheduleJob = require('./jobs/emailScheduleJob');

const app = require('./app');

mongoose.set('strictQuery', true);

const db = process.env.DB_REMOTE_URL;
mongoose.connect(db).then(() => {
  console.log('Connection to DB successful.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running in: ${process.env.NODE_ENV} mode`);
  console.log(`Server is runnig on port: ${port}`);
  scheduleJob.fromDB().then((jobs) => {
    console.log(`Jobs scheduled: ${Object.keys(jobs).length}`);
  });
});
