const { sendMail } = require("../../helper/mailer");
const { inngest } = require("../client");

exports.sendWeeklyDigestMail = inngest.createFunction(
  { id: "send-weekly-digest-mail" },
  { event: "event/send-weekly-digest-mail" },
  async ({ event, step }) => {

    const { name, email } = event.data;
    await step.sleep("wait for the time 1", "1m");
    await step.run("send-mail 1", async () => {
      await sendMail({
        to : email,
        subject: "Reminder Sent",
        html: "<b> reminder sent at 1m </b>"
      });
    });

    await step.sleep("wait for the time 2", "3m");
    await step.run("send-mail 2", async () => {
      await sendMail({
        to : email,
        subject: "Reminder Sent",
        html: "<b> reminder sent at 3m </b>"
      });
    });

    await step.sleep("wait for the time 3", "5m");
    await step.run("send-mail 3", async () => {
      await sendMail({
        to : email,
        subject: "Reminder Sent",
        html: "<b> reminder sent at 5m </b>"
      });
    });
  }
);
