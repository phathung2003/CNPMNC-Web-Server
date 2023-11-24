require('dotenv').config()
const ObjectIdCaiDat = process.env.OBJECT_ID;

const express = require('express');
const router = express.Router();

const CaiDatModel = require("../models/CaiDat")
const KhachHangModel = require("../models/KhachHang");

router.post('/CustomerAdd//:SoLuong', async (req,res) => {
    try{
        await KhachHangModel.create(req.body).then((KhachHangInfo) => res.json({success: true, msg: `${KhachHangInfo._id}`}))

        if(req.params.SoLuong > 0){
            await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {SLKhachHang: req.params.SoLuong}})
        }
    }
    catch{res.json({ success: false, msg: 'Thêm khách hàng thất bại. Vui lòng thử lại sau !' })}
})

router.post('/CustomerEdit/:ID/:SoLuong', async (req,res) => {
    const {TenKH, NgaySinh, DiaChi, SoDienThoai, CMND, HinhCMND, BangLai, HinhBangLai} = req.body;

    await KhachHangModel.updateOne({ _id : `${req.params.ID}`},{
        $set: {
            TenKH: TenKH, 
            NgaySinh : NgaySinh, 
            DiaChi : DiaChi, 
            SoDienThoai : SoDienThoai, 
            CMND : CMND, 
            HinhCMND : HinhCMND, 
            BangLai : BangLai, 
            HinhBangLai : HinhBangLai
        }
    })
    .then(() => res.json({ success: true, msg:`${req.params.ID}` }))
    .catch(() => res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' }))

})

router.get('/CustomerMain/', async (req,res) => {
    await KhachHangModel.find()
    .then(info => res.json(info))
    .catch(err => res.json(err))
})

module.exports = router;