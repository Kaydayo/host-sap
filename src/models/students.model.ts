import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
    fullname : String,
    userId: String,
    subjects:[{
        subject: String,
        instructor: String,
        grade: Number
    }],
    class: String,
    parentEmail: String,
    parentName: String
})

export default mongoose.model('Student', StudentSchema);