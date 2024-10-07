const express = require("express");
const { courseEnroll } = require("../controllers/userController");
// const { functions, inngest } = require("../inngest/index");
// const { serve } = require("inngest/express");

require("dotenv").config();

const router = express.Router();

router.post("/courseEnroll", courseEnroll);

module.exports = router;
