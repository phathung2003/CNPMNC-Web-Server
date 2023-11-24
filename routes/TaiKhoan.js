require('dotenv').config()

const express = require('express');
const router = express.Router();

const TaiKhoanModel = require('../models/TaiKhoan');


router.get('/AccountMain', async (req,res) => {
    try{
        const info = await TaiKhoanModel.find({ ChucVu: { $in: ["Giám đốc", "Kế toán"] } }).populate("IDNV")
        res.json(info)
    }
    catch(e){res.json(e)}
})

router.get('/AccountDetail/:IDNV', async (req,res) => {
    try{
        const info = await TaiKhoanModel.findOne({_id : `${req.params.IDNV}`}).populate("IDNV")
        res.json(info)
    }
    catch(e){res.json(e)}
    // .catch(err => res.json(err))
})

router.post('/AccountAdd/', async (req,res) => {
    try{
        await TaiKhoanModel.create(req.body).then(() => res.json({success: true, msg: "Thêm nhân viên thành công"}))
    }
    catch{() => {res.json({ success: false, msg: 'Thêm nhân viên thất bại. Vui lòng thử lại sau !' })}}
})


router.post('/AccountEdit/:IDNV', async (req,res) => {
    try{
        const {TenTaiKhoan,MatKhau,ChucVu,Avatar} = req.body;
        await TaiKhoanModel.updateOne({ _id : `${req.params.IDNV}`},{
            $set: {
              TenTaiKhoan : TenTaiKhoan,
              MatKhau : MatKhau,
              ChucVu : ChucVu,
              Avatar : Avatar,
            }
        })
        .then(() => res.json({ success: true, msg: 'Cập nhật thành công !' }))
    }
    catch{() => res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' })}

   
})


module.exports = router;