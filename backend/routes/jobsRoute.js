const express = require('express');
const jobsController = require('../controllers/jobsCrontroller');

const router = express.Router();

router.get('/', jobsController.getAllJobs);
module.exports = router;
