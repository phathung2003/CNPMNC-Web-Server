//Khai báo để chạy biến môi trường
require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const HOSTS_REGEX = /^(?<protocol>[^/]+):\/\/(?:(?<username>[^:@]*)(?::(?<password>[^@]*))?@)?(?<hosts>(?!:)[^/?@]*)(?<rest>.*)/;

//Lấy đường liên kết + Port
const databaseTest = process.env.DATABASE_TEST;
const databaseXe = process.env.DATABASE_CAR;
const port = process.env.PORT;

module.exports = function result(table){
    let database;

    switch(table){
        case true:
            database = databaseXe;
            break;
        default:
            database = databaseTest
            break;
    }
    if(database === undefined && !checkPort(port)){
        console.log("Bạn thiếu file .env hoặc file .env không hợp lệ để khởi động chương trình")
        return [false,null,null]
    }
    
    if(!checkConnectionString(database)){   
        console.log("Không thể kết nối tới database !")
        return [false,null,null]
    }
    const app = connectDatabase(database);
    return [true, port,app]
}

//-- Hàm check port --//
function checkPort(port){
    //Port chứa 16 bit => Từ 0 --> 65535
    if(port < 0 )
        return false;
    if(port > 65535)
        return false;
    if(typeof port !== 'number') 
        return false;
    
    return true;
}

//-- Check Link kết nối --//
function checkConnectionString(uri){
    
    if(uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')) {
        return true;
    }

    if(uri.match(HOSTS_REGEX)) {
        return true;
    }
    
    return false;
}

//-- Hàm kết nối database --//
function connectDatabase(uri){
    const app = express()
    app.use(express.json())
    app.use(cors())

    //Kết nối đến MongoDB
    mongoose.connect(uri)
    return app;
}

