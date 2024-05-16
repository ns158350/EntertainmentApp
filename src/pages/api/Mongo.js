// MongoDB connection URL
const MONGO_URL = "mongodb+srv://ujjwalnatani10:Ugnatani@cluster0.ijnxryd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Import mongoose library
const mongoose = require("mongoose")

// Connect to MongoDB database
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("mongodb connected"); // Log successful connection
    })
    .catch((e) => {
        console.log('failed', e); // Log connection failure
    })

// Define schema for user data
const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Create model for user data collection
const collection = mongoose.model("user_data", newSchema)

module.exports = collection // Export model for external use
