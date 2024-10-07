const { inngest } = require("../client");
const { Users } = require("../../models/users");
const { sendMail } = require("../../helper/mailer");

exports.setReminders = inngest.createFunction(
  { id: "course-enrolled" },
  { event: "course/enrolled" },
  async ({ event, step }) => {
    
    const { userName, courseStartDate, email } = event.data;

    const users = await step.run("create-user", async () => {
      return await Users.create({
        userName: userName,
        courseStartDate: new Date(courseStartDate),
        email: email,
      });
    });

    const startDate = new Date(courseStartDate);
    const startTime = new Date(startDate.getTime());

    const reminderTime = new Date(startTime.getTime() - 1 * 60 * 1000);

    console.log("starting sleep untill");

    await step.sleepUntil("waiting-for-the-reminder-to-send", reminderTime);

    await step.run("reminder-sent", async () => {
      await sendMail({
        to: email,
        subject: "Course Starting",
        body: `Your course is going to start at : ${courseStartDate}!`,
        // text: "Hello world?", // plain text body
        html: "<b> Your course is going to start at: " + courseStartDate + "</b>", // html body
    
      });

      return await Users.updateOne(
        { userName },
        { $set: { reminderSent: true } }
      );
    });

    return `Reminder sent to the ${users.userName}`;
  }
);
