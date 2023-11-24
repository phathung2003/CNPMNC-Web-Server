const mongoose = require("mongoose")

const XeSchema = new mongoose.Schema({
    IDXe: String,
    TenXe: String,
    BienSo: String,
    SoCho: Number,
    TruyenDong: String,
    NhienLieu: String,
    MoTa: String,
    SoTien: Number,
    HinhAnh: String,
    TinhTrang: String,
    IDDon:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SoXe"
    }
    
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const XeModel  = mongoose.model("Xe",XeSchema)
module.exports = XeModel