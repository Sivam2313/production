const express = require('express');
const { authHw, registerHw, fetchTotalHw } = require('../controllers/hwControllers');

const router = express.Router();

router.post('/login' , authHw)
router.post('/register', registerHw)
router.get('/countHw',fetchTotalHw)

module.exports = router;