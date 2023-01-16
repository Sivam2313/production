const express = require('express');
const { authAdmin } = require('../controllers/userController');
// const {add} = require('../controllers/addController')
const router = express.Router();

router.post('/login' , authAdmin)
// router.post('/add',add)


module.exports = router;