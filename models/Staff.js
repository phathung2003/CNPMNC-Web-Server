const mongoose = require("mongoose")

const staffChema = new mongoose.Schema({
    IDNV: String,
    Avatar: String,
    TenNV: String,
    NgaySinh: Date,
    DiaChi: String,
    SoDienThoai: String,
    CMND: String,
    HinhCMND: String
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const staffModel = mongoose.model("Staff",staffChema)
module.exports = staffModel