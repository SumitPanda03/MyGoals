const express = require("express");
const router = express.Router();

const {registerUser,loginUser,getUser} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)
// server ko /api/users hi jayega and /login and /me ye sab usi me append ho jayega


module.exports = router