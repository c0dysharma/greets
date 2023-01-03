const schedule = require('node-schedule');
const emailUtils = require('../utils/emailUtils');
const Event = require('../models/eventModel');

const jobs = {};

// schedule jobs from date
const fromDate = (event) => {
  const job = schedule.scheduleJob(event.dateTime, async () => {
    const { to, from, messageBody, messageTitle } = event;
    const email = await emailUtils.sendEmail(
      from,
      to,
      messageTitle,
      messageBody
    );
    console.log(`Event email sent ${to}:${email.messageId}`);
  });
  // if job already present cancel it and create new
  if (jobs[event._id]) jobs[event._id].cancel();
  jobs[event._id] = job;
  return job;
};

// schedule jobs which are active
const fromDB = async () => {
  const todayDate = new Date();
  const allEvents = await Event.find({
    isActive: true,
    $or: [{ repeat: true }, { repeat: false, dateTime: { $gte: todayDate } }],
  });
  // increase date if repeat is true and date already gone
  allEvents.forEach(async (event) => {
    if (
      event.repeat === true &&
      event.dateTime.getFullYear() < todayDate.getFullYear()
    )
      event.dateTime.setFullYear(event.dateTime.getFullYear() + 1);
    // schedule the emailing event and store job for cancelling if required
    fromDate(event);
  });
  return jobs;
};

// cancel a job
const cancel = (id) => {
  if (jobs[id]) jobs[id].cancel();
  jobs[id] = undefined;
  return id;
};

module.exports = { jobs, cancel, fromDate, fromDB };
