const express = require('express');
const { authDoctor, registerDoctor, fetchTotalDoctors } = require('../controllers/doctorControllers');

const router = express.Router();

router.post('/login' , authDoctor);
router.post('/register', registerDoctor);
router.get('/countDoctor',fetchTotalDoctors);

module.exports = router;