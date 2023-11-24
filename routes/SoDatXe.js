require('dotenv').config()
const ObjectIdCaiDat = process.env.OBJECT_ID;

const express = require('express');
const router = express.Router();

const CaiDatModel = require("../models/CaiDat")
const SoXeModel = require('../models/SoXe');
const XeModel = require("../models/Xe");
const LichSuModel = require("../models/LichSu")

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.post('/BookAdd/:IDXe//:SLDon/:SLDatTruoc', async (req,res) => {
    try{

        await SoXeModel.create(req.body).then((e) => res.json({success: true, msg: e._id}))

        if(req.params.SLDon > 0 && req.params.SLDatTruoc > 0){
            await CaiDatModel.updateOne({_id : ObjectIdCaiDat},{$set: {SLDon: req.params.SLDon, SLDonDatTruoc: req.params.SLDatTruoc}})
        }

        //Ghi lịch sử
        const log = {
            Ngay: new Date(Date.now()).getTime(),
            MaDon: `${req.body.IDDon}`,
            DanhMuc: "Sổ đặt xe",
            MoTa: `Tạo đơn đặt trước thành công`,
            ThongTin: 0,
        }
        await LichSuModel.create(log);
    }
    catch{() => {res.json({ success: false, msg: 'Tạo đơn đặt trước xe thất bại. Vui lòng thử lại sau !' })}}
})

router.get('/BookDetail/:IDXe/:IDDon', async (req,res) => {
    const info = await SoXeModel.find({ 
        IDXe : `${req.params.IDXe}`,
        _id : { $nin: [req.params.IDDon] }
    }).populate("IDXe").populate("IDKH")
    res.json(info)
    // .catch(err => res.json(err))
})

router.get('/BookDetail/:IDXe/', async (req,res) => {
    const info = await SoXeModel.find({ IDXe : `${req.params.IDXe}`,}).populate("IDXe").populate("IDKH")
    res.json(info)
    // .catch(err => res.json(err))
})

router.post('/BookEdit/:IDXe/:IDDon/:SLDon', async (req,res) => {
    try{
        const {NgayBatDau, NgayKetThuc,TinhTrang} = req.body;

        await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
            $set: {
              NgayBatDau : NgayBatDau,
              NgayKetThuc : NgayKetThuc,
              TinhTrang : TinhTrang
            }
        })
    
        //Ghi lịch sử
        const log = {
            Ngay: new Date(Date.now()).getTime(),
            MaDon: `${req.body.IDDon}`,
            DanhMuc: "Sổ đặt xe",
            MoTa: `Chỉnh sửa thông tin thành công`,
            ThongTin: 0,
        }
        await LichSuModel.create(log);

        res.json({ success: true, msg: 'Cập nhật thành công !' })
    }
    catch{() => res.json({ success: false, msg: 'Cập nhật thất bại. Vui lòng thử lại sau !' })}
})

router.post('/BookCancel/:IDDon', async (req,res) => {
    try{
        await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
            $set: {TinhTrang : "Huỷ đơn"}
        })

        //Ghi lịch sử
        const log = {
            Ngay: new Date(Date.now()).getTime(),
            MaDon: `${req.body.IDDon}`,
            DanhMuc: "Sổ đặt xe",
            MoTa: `Huỷ đơn đặt trước thành công`,
            ThongTin: 0,
        }
        await LichSuModel.create(log);

        res.json({ success: true, msg: 'Huỷ đơn đặt trước thành công !' })
    }
    catch{() => res.json({ success: false, msg: 'Huỷ đơn đặt trước thất bại. Vui lòng thử lại sau !' })}
})

router.post('/BookCreateRent/:IDXe/:IDDon', async (req,res) => {
    const {TinhTrang, KhachTra} = req.body;

    try{
        await SoXeModel.updateOne({ _id : `${req.params.IDDon}`},{
            $set: {
              KhachTra : KhachTra,
              TinhTrang : TinhTrang
            }
        })    
        .then(async() => {await XeModel.updateOne({ _id : `${req.params.IDXe}`},{
                $set: {
                    TinhTrang : "Đang thuê",
                    IDDon: new ObjectId(`${req.params.IDDon}`),
                }
            })
            .then(() => res.json({success: true, msg: "Tạo đơn thành công"}))
        }) 

        //Ghi lịch sử
        const log = {
            Ngay: new Date(Date.now()).getTime(),
            MaDon: `${req.body.IDDon}`,
            DanhMuc: "Sổ xe",
            MoTa: "Tạo đơn thành công",
            ThongTin: req.body.KhachTra,
        }
        await LichSuModel.create(log);
    }
    catch{() => res.json({ success: false, msg: 'Tạo đơn thất bại. Vui lòng thử lại sau !' })}
})

module.exports = router;