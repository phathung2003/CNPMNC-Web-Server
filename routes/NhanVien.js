require('dotenv').config()
const ObjectIdCaiDat = process.env.OBJECT_ID;

const express = require('express');
const router = express.Router();

const CaiDatModel = require("../models/CaiDat")
const NhanVienModel = require("../models/NhanVien");

router.post('/EmployeeAdd//:SoLuong', async (req,res) => {
    try{
        await NhanVienModel.create(req.body).then((NhanVienInfo) => res.json({success: true, msg: `${NhanVienInfo._id}`}))

        if(req.params.SoLuong > 0){
            await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {SLNhanVien: req.params.SoLuong}})
        }
    }
    catch{res.json({ success: false, msg: 'Thêm nhân viên thất bại. Vui lòng thử lại sau !' })}
})

router.post('/EmployeeEdit/:ID/:SoLuong', async (req,res) => {
    const {IDNV, TenNV, NgaySinh, DiaChi, SoDienThoai, CMND} = req.body;
    try{
        await NhanVienModel.updateOne({ _id : `${req.params.ID}`},{
            $set: {
                IDNV : IDNV,
                TenNV : TenNV, 
                NgaySinh : NgaySinh, 
                DiaChi : DiaChi, 
                SoDienThoai : SoDienThoai, 
                CMND : CMND
            }
        }).then(() => res.json({ success: true, msg:`${req.params.ID}` }))

        if(req.params.SoLuong > 0){
            await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {SLNhanVien: req.params.SoLuong}})
        }
    }catch{res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' })}

})

router.get('/StaffMain/', async (req,res) => {
    await NhanVienModel.find()
    .then(info => res.json(info))
    .catch(err => res.json(err))
})

module.exports = router;