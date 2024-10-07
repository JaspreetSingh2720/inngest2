const { Users } = require("../models/users");
const { inngest } = require("../inngest/client");
exports.courseEnroll = async (req, res) => {
  try {
    const { userName, courseStartDate, email } = req.body;

    await inngest.send({
      name: "course/enrolled",
      data: { userName, courseStartDate, email },
    });

    res
      .status(200)
      .json({ message: "Course reminder scheduled successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scheduling reminder", error: error.message });
  }
};
