const express = require('express')
const router = express.Router()
const { getGoals,setGoals,updateGoals,deleteGoals } = require('../controller/goalController')
const {protect} = require('../middleware/authMiddleware')
//the '/' will turn into /api/goals in server

router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals)

// router.get('/', getGoals)
// router.post('/', setGoals)
// router.put('/:id', updateGoals)
// router.delete('/:id', deleteGoals)



module.exports = router