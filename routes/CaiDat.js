require('dotenv').config()
const ObjectId = process.env.OBJECT_ID;

const express = require('express');
const router = express.Router();

const XeModel = require("../models/Xe");
const KhachHangModel = require("../models/KhachHang");
const SoXeModel = require("../models/SoXe");
const CaiDatModel = require("../models/CaiDat")
const LichSuModel = require("../models/LichSu")
const TaiKhoanModel = require("../models/TaiKhoan")
const NhanVienModel = require("../models/NhanVien")

router.get('/ResetStatistic/:Password', async (req,res) => {
    if(req.params.Password == process.env.PASSWORD){
        try{
        
            await XeModel.deleteMany()
            await KhachHangModel.deleteMany()
            await SoXeModel.deleteMany()
            await LichSuModel.deleteMany()
            await TaiKhoanModel.deleteMany()
            await NhanVienModel.deleteMany()
            await CaiDatModel.updateOne({_id : ObjectId},{
                $set: 
                {
                    Xe4: 0,
                    Xe8: 0,
                    Xe16: 0,
                    Xe30: 0,
                    Xe45: 0,
                    SLDon: 0,
                    SLDonDatTruoc: 0,
                    SLKhachHang: 0,
                    SLNhanVien: 0,
                }
            })
            res.json({"status": 200, "message": "Cài lại hoàn thành"})
        }
        catch{(e) => res.json(e)}
    }
    else
    res.json("Bạn không có quyền để thực hiện thao tác này !")
})


router.get('/SettingMain', async (req,res) => {
    try{
        const data = await CaiDatModel.findOne({ _id : ObjectId})
        return res.json(data)
    }
    catch{(err) => {return res.json(err);}}
})



module.exports = router;