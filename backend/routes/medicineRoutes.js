const express = require('express');
const { changeNumber, fetch, add } = require('../controllers/medicineControllers');

const router = express.Router();

router.get('/fetch' , fetch)
router.post('/change',changeNumber)
router.post('/add',add)


module.exports = router;