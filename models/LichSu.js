const mongoose = require("mongoose")

const LichSuSchema = new mongoose.Schema({
    Ngay: Number,
    MaDon: String,
    DanhMuc: String,
    MoTa: String,
    ThongTin: Number
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const LichSuModel  = mongoose.model("LichSu",LichSuSchema)
module.exports = LichSuModel
