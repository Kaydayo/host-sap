import mongoose from 'mongoose'



const SubjectSchema = new mongoose.Schema({
        subject: String,
        instructor: String,
        grade: Number
})

export default mongoose.model('Subjects', SubjectSchema);