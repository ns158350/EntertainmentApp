const express = require("express")
const collection = require("./Mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {

})

app.post("/", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await collection.findOne({ email: email });

        if (!user) {
            res.json("notexist");
            return; // Exit early if user doesn't exist
        }

        // Check if the provided password matches the stored password
        if (user.password === password) {
            res.json("exist"); // Passwords match, successful login
        } else {
            res.json("incorrectpassword"); // Passwords don't match
        }
    }
    catch (e) {
        res.json("fail")
    }
})

app.post("/SignUp", async (req, res) => {
    const { name, email, password } = req.body;

    const data = {
        name: name,
        email: email,
        password: password
    }

    try {
        const check = await collection.findOne({ email: email })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await collection.insertMany([data])
        }
    }
    catch (e) {
        res.json("fail")
    }
})

app.listen(PORT, () => {
    console.log(`Server connected at Port:${PORT}`);
})
