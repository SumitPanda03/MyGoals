const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')
//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user: req.user.id}) //goals ke model mei user model ko reference kiya hai
    res.status(200).json(goals)
})

//@desc Set goals
//@route POST /api/goals
//@access Private
const setGoals = asyncHandler(async (req,res) => {
    if(!req.body.text){
        // res.status(400).json({message: 'Please add a text file'})
        res.status(400)
        throw new Error("Please add a text field")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    // only logged in user can see his/her own goal
    res.status(200).json(goal)
})

//@desc Update goals
//@route PUT /api/goals
//@access Private
const updateGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //logged in user should only be able to update their own goal not others

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    })

    res.status(200).json(updatedGoal)
})

//@desc Delete goals
//@route DELETE /api/goals
//@access Private
const deleteGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    //logged in user should only be able to delete their own goal not others
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //logged in user should only be able to update their own goal not others

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
     
    await goal.deleteOne()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}

//promises use karte normal wala then then catch karke error handle
//async await use karne se try catch
//express ka error handler use karne se uska automatically ho jata hai