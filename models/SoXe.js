const mongoose = require("mongoose")

const SoXeSchema = new mongoose.Schema({
    IDDon: String,
    NgayBatDau: Number,
    NgayKetThuc: Number,
    TinhTrang: String,
    KhachTra: Number,
    IDXe: {type: mongoose.Schema.Types.ObjectId, ref: "Xe"},
    IDKH: {type: mongoose.Schema.Types.ObjectId, ref: "KhachHang"}
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const SoXeModel  = mongoose.model("SoXe",SoXeSchema)
module.exports = SoXeModel
