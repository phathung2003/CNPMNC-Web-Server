const check = require("./checkConnection");
const contactModel = require("./models/Contact");
const [result, port, app] = check(true);

const XeRoute = require('./routes/Xe')
const SoDatXeRoute = require('./routes/SoDatXe');
const SoXeRoute = require('./routes/SoXe')
const KhachHangRoute = require('./routes/KhachHang');
const CaiDatRoute = require('./routes/CaiDat');
const LichSuRoute = require("./routes/LichSu")
const NhanVieRoute = require("./routes/NhanVien")
const TaiKhoanRoute = require("./routes/TaiKhoan")

const staffModel = require("./models/NhanVien")
const carModel = require("./models/Xe");
const login = require("./models/TaiKhoan")

if(result){
    app.post('/contact', (req,res) => {
        
        const {name, email, password} = req.body;
        contactModel.findOne({email : email}).then(
            user => {
                if(user){
                        res.json("Tài khoản đã tồn tại")
                }
                else{
                    contactModel.create(req.body)
                    .then(info => res.json(info))
                    .catch(err => res.json(err))
                }
            }
        )
    })
    
    app.post("/main",async (req,res) => { 
        const {email, password} = req.body;
        var a = await login.findOne({TenTaiKhoan : email}).populate("IDNV")
        res.json(a)
        
    })

    app.get("/info",(req,res) => {
        contactModel.find()
        .then(info => res.json(info))
        .catch(err => res.json(err))
    })
    
    //--------- Xử lý quản lý xe ---------///
    app.use('/Car', XeRoute)

    //--------- Xử lý quản lý sổ đặt xe ---------///
    app.use('/Book', SoDatXeRoute);

    //--------- Xử lý quản lý sổ xe (Khách hàng) ---------//
    app.use('/Customer', KhachHangRoute);
    
    //--------- Xử lý quản lý sổ xe (Sổ xe) ---------//
    app.use('/Rent', SoXeRoute)

    //--------- Xử lý cài đặt ---------//
    app.use('/Setting', CaiDatRoute)

    //--------- Xử lý Lịch sử ---------//
    app.use('/History', LichSuRoute)

    //--------- Xử lý quản lý nhân viên ---------///    

    app.use('/Employee', NhanVieRoute)

    app.use('/Account', TaiKhoanRoute)

    try{app.listen(port, () =>{console.log("Server khởi động tại port " + port)})}
    catch{console.log("Server khởi động thất bại")}
}