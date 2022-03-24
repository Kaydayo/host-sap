import mongoose from 'mongoose'

const ClassSchema =  new mongoose.Schema({
    classname : String,
    students: {}
})