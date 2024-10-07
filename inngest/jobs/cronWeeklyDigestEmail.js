const{inngest} = require("../client");
const {Users} = require("../../models/users");

exports.prepareWeeklyDigest = inngest.createFunction(
    { id: "prepare-weekly-digest" },
    { cron : "*/2 * * * 6"},  // every 2 minutes
    // { cron : "6 18 * * 4"},  // at 12:00 am on thursday
    async({event, step})=>{

        const users = await step.run("get-users", async()=>{
            return await Users.find({});
        })

        console.log(users);

        const events = users.map((user)=>{
            return {
                name: "event/send-weekly-digest-mail",
                data: {
                    name: user.userName,
                    email: user.email, 
                }
            }
        })

        await step.sendEvent("sending-events", events);

        return {count : users.length}

    }
)