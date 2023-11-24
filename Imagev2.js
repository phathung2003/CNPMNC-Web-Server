const {initializeApp} = require("firebase/app");
const {getStorage, uploadBytesResumable,ref, getDownloadURL} = require("firebase/storage");
const { createRef } = require("react");
const {v4} = require('uuid');


const firebaseConfig = {
  apiKey: "AIzaSyDDKzp7x1RyLw3s8rTtPSYFAFDMyL1gddE",
  authDomain: "thuexe-5b600.firebaseapp.com",
  projectId: "thuexe-5b600",
  storageBucket: "thuexe-5b600.appspot.com",
  messagingSenderId: "294754595337",
  appId: "1:294754595337:web:556e0b3849cb41ee127ed8"
};



function Image(image){
    const app = initializeApp(firebaseConfig);
    const storage = getStorage();
    const upload = multer({storage: multer.memoryStorage()})

    console.log("Go Here")
    const imgRef = createRef(storage, `file/${v4()}`)
    uploadBytesResumable(imgRef,image)
    console.log(getDownloadURL)
}

module.exports = {Image}