require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Event = require('../models/eventModel');

mongoose.set('strictQuery', true);
const dataFile = path.join(__dirname, 'starterData.json');
const argument = process.argv[2];

const db = process.env.DB_REMOTE_URL;
mongoose
  .connect(db)
  .then(() => {
    console.log('Connection to DB successful.');
    if (argument === '--delete') {
      Event.deleteMany()
        .then((data) => {
          console.log('Removed Data');
          console.log(data);
          process.exit();
        })
        .catch((error) => {
          console.error('Error removing Data');
          console.error(error);
          process.exit();
        });
    } else if (argument === '--import') {
      const jsonData = fs.readFileSync(dataFile, 'utf-8');
      Event.insertMany(JSON.parse(jsonData))
        .then((data) => {
          console.log('Imported Data');
          console.log(data);
          process.exit();
        })
        .catch((error) => {
          console.error('Error importing Data');
          console.error(error);
          process.exit();
        });
    } else {
      console.log('Specify flag.');
      process.exit();
    }
  })
  .catch((error) => console.log(error));
