import mongoose from 'mongoose'

const TeacherSchema = new mongoose.Schema({
    fullname: String,
    userId: String,
    phoneNo: String,
    email: String,
    address: String,
    gender: String,
    class: [String],
    subjects: [String]
})

export default mongoose.model('Teacher', TeacherSchema);