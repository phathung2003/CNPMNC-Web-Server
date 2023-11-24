const mongoose = require("mongoose")

const TaiKhoanSchema = new mongoose.Schema({
    TenTaiKhoan: String,
    MatKhau: String,
    ChucVu: String,
    Avatar: String,

    IDKH: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KhachHang"
    },

    IDNV: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NhanVien"
    }
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const TaiKhoanModel  = mongoose.model("TaiKhoan",TaiKhoanSchema)
module.exports = TaiKhoanModel
