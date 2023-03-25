const express = require("express") 
const auth = require("./auth")

module.exports = { 
    init (app) {
        const router = express.Router()

        router.post("/save",auth, async function (request, result) {
            const user = request.user
            const contacts = JSON.parse(request.fields.contacts)

            await db.collection("users").findOneAndUpdate({
                _id: user._id
            }, {
                $set: {
                    contacts: contacts
                }
            })
            result.json({
                status: "success",
                message: "Contacts has been saved."
            })
        })
        app.use("/contacts", router)
    }
}