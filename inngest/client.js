const {Inngest} = require("inngest")
require("dotenv").config();

exports.inngest = new Inngest({
    id: "my-ingest-app",
    name: "My Inngest App",
    eventKey: process.env.INNGEST_EVENT_KEY
})
