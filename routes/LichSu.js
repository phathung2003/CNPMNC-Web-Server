const express = require('express');
const router = express.Router();

const LichSuModel = require('../models/LichSu');

router.get('/HistoryMain', async (req,res) => {
    await LichSuModel.find()
    .then(info => res.json(info))
    .catch(err => res.json(err))
})

module.exports = router;