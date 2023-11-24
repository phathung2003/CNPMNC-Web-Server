const mongoose = require("mongoose")

const KhachHangSchema = new mongoose.Schema({
    IDKH: String,
    TenKH: String,
    NgaySinh: Number,
    DiaChi: String,
    SoDienThoai: String,
    CMND: String,
    HinhCMND: String,
    BangLai: String,
    HinhBangLai: String,
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const KhachHangModel  = mongoose.model("KhachHang",KhachHangSchema)
module.exports = KhachHangModel
