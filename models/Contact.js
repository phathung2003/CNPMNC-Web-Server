const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const contactModel = mongoose.model("contact",contactSchema)
module.exports = contactModel