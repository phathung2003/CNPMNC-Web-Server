const express = require('express')
const imgur = require('imgur')
const fileUpload = require('express-fileupload')

const app = express();
app.use(fileUpload());
app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

function Image(req,res){
    if(!res.image){
        return res.status(400).send("No files were upload")
    }
    let samepleFile = req.files.samepleFile
    let uploadPath = __dirname + '/uploads/' + samepleFile.name

    samepleFile.mv(uploadPath, function(err){
        if(err){
            return res.status(500).send(err)
        }

        imgur.uploadFile(uploadPath).then((urlObject) => {
            fs.unlinkSync(uploadPath)
            res.send(urlObject)
            console.log(urlObject.data.link)
        })
    })
}

module.exports = {Image}