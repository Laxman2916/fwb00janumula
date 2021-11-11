const mongoose = require("mongoose") 
const vehicleSchema = mongoose.Schema({ 
    Brand: String, 
    price: Number, 
    size: String 
})  
module.exports = mongoose.model("vehicle", vehicleSchema) 