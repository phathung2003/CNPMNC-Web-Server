const mongoose = require("mongoose")

const CaiDatSchema = new mongoose.Schema({
    Xe4: Number,
    Xe8: Number,
    Xe16: Number,
    Xe30: Number,
    Xe45: Number,
    SLDon: Number,
    SLDonDatTruoc: Number,
    SLKhachHang: Number,
    SLNhanVien: Number,
})

//const <Tên model> = mongoose.model("<Tên bảng",<Dữ liệu)
const CaiDatModel  = mongoose.model("CaiDat",CaiDatSchema)
module.exports = CaiDatModel
