const { helloWorld } = require("./jobs/helloWorld");
const {delayFunctions} = require("./jobs/delayFunctions");
const {setReminders} = require("./jobs/setReminders");
const {prepareWeeklyDigest} = require("./jobs/cronWeeklyDigestEmail");
const {sendWeeklyDigestMail} = require("./jobs/sendWeeklyDigestEmail")

const { inngest } = require("./client");
const functions = [helloWorld, delayFunctions, setReminders, prepareWeeklyDigest, sendWeeklyDigestMail];

module.exports ={functions, inngest}