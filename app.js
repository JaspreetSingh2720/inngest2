const express = require("express");
const { functions, inngest } = require("./inngest/index");
const { serve } = require("inngest/express");
const { connectToMongoDb } = require("./config/connection");
require("dotenv").config();

const app = express();
const Port = 4000;      

// DbConnection
connectToMongoDb(process.env.MONGO_URL)
.then(()=>console.log("MongoDb connected"))
.catch((err)=> console.log(`connection failed err : ${err}`));

app.use(express.json());

app.use("/api/inngest", serve({client: inngest, functions: functions}));
app.use("/api", require("./routes/userRoutes"));

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})