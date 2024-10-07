const { inngest } = require("../client");
const functionId = "hello-world"
exports.helloWorld = inngest.createFunction(
  { id: functionId },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    console.log("...............................==.....", functionId)
    await step.sleep("wait-a-moment", "6s");
    return { event, body: "Hello, World!" };
  },
);
