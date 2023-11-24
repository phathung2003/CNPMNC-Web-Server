require('dotenv').config()
const ObjectIdCaiDat = process.env.OBJECT_ID;

const express = require('express');
const router = express.Router();

const SoXeModel = require('../models/SoXe');
const XeModel = require("../models/Xe");
const CaiDatModel = require("../models/CaiDat")

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.post('/CarAdd/:ID/:SoLuong', async (req,res) => {
    console.log("Hi")
    try{
        await XeModel.create(req.body)

        switch(req.body.SoCho){
            case "4":
                await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe4: req.params.SoLuong}})
                break;
            case "8":
                await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe8: req.params.SoLuong}})
                break;
            case "16":
                await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe16: req.params.SoLuong}})
                break;
            case "30":
                await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe30: req.params.SoLuong}})
                break;
            case "45":
                await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe45: req.params.SoLuong}})
                break;
            default:
                break;
        }

        res.json({success: true, msg: 'Thêm xe thành công'})
    }
    catch(e){
        res.json({ success: false, msg: 'Thêm xe thất bại. Vui lòng thử lại sau !' })
    }
})


router.post('/CarDelete/:ID', async (req, res) => {
    await SoXeModel.deleteMany({IDXe : `${req.params.ID}`})
    await XeModel.deleteOne({ _id : `${req.params.ID}`})

    .then(() => res.json({ success: true, msg: 'Xoá xe thành công' }))
    .catch(() => res.json({ success: false, msg: 'Xoá xe thất bại. Vui lòng thử lại sau !' }))
});


router.post('/CarEdit/:ID/:SoLuong', async (req, res) => {
    try{
        const {IDXe, TenXe, BienSo, SoCho, TruyenDong, NhienLieu, MoTa, SoTien, HinhAnh, TinhTrang} = req.body;
        await XeModel.updateOne({ _id : `${req.params.ID}`},{
            $set: {
                IDXe: IDXe,
                TenXe : TenXe,
                BienSo :  BienSo,
                SoCho : SoCho,
                TruyenDong : TruyenDong,
                NhienLieu : NhienLieu,
                MoTa : MoTa,
                SoTien : SoTien,
                HinhAnh : HinhAnh,
                TinhTrang : TinhTrang,
            }
        })
    
        if(req.params.SoLuong > 0){
            switch(req.body.SoCho){
                case "4":
                    await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe4: req.params.SoLuong}})
                    break;
                case "8":
                    await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe8: req.params.SoLuong}})
                    break;
                case "16":
                    await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe16: req.params.SoLuong}})
                    break;
                case "30":
                    await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe30: req.params.SoLuong}})
                    break;
                case "45":
                    await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {Xe45: req.params.SoLuong}})
                    break;
                default:
                    break;
            }
        }
       

        res.json({ success: true, msg: 'Cập nhật thành công !' })
    }
    catch{res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' })}

});

router.get("/CarMain", async (req,res) => {
    await XeModel.find().then(info => res.json(info)).catch(err => res.json(err))
})

router.get("/CarDetail/:IDXe", async (req,res) => {
    const info = await XeModel.findOne({_id : `${req.params.IDXe}`}).populate("IDDon")
    res.json(info)
})

module.exports = router;