const { inngest } = require("../client");

const timingArray = [
  { action: "Action1", delay: "2s" },
  { action: "Action2", delay: "4s" },
  { action: "Action3", delay: "7s" },
];

exports.delayFunctions = inngest.createFunction(
  { id: "delay-functions" },
  { event: "test/delay" },
  async ({ event, step }) => {
    for (let i = 0; i < timingArray.length; i++) {
      await step.sleep(
        `wait for ${timingArray[i].delay}`,
        timingArray[i].delay
      );

      await step.run(timingArray[i].action, async () => {
        return { event, body: timingArray[i].action };
      });
    }
  }
);
